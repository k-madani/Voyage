import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const BookingPersonalInfo: React.FC<any> = ({ props }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
  });

  const [editable, setEditable] = useState(true);

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Enter a valid email address";
  };

  const validatePhoneNumber = (phoneNumber: string): string => {
    // Simple validation: Check if it contains only digits
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phoneNumber) ? "" : "Enter a valid phone number";
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate email and phone number
    const emailError = validateEmail(formData.email);
    const phoneNumberError = validatePhoneNumber(formData.phoneNumber);

    if (emailError || phoneNumberError) {
      setErrors({
        email: emailError,
        phoneNumber: phoneNumberError,
      });
    } else {
      // Handle form submission logic here
      setErrors({
        email: "",
        phoneNumber: "",
      });
      setEditable(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name?: string | undefined; value: unknown }
    >
  ) => {
    if (editable) {
      const { name, value } = event.target || {};
      setFormData((prevData) => ({
        ...prevData,
        [name as string]: value,
      }));
    }
  };

  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    if (editable) {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name as string]: value,
      }));
    }
  };

  const handleEdit = () => {
    // Enable editing on click of the "Edit" button
    setEditable(true);
  };

  const onClickAddPassenger = () => {
    props(formData);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Passenger Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              onChange={handleInputChange}
              value={formData.firstName}
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              onChange={handleInputChange}
              value={formData.lastName}
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleInputChange}
              value={formData.email}
              error={Boolean(errors.email)}
              helperText={errors.email}
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleSelectChange as any} // Type assertion
                disabled={!editable}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              onChange={handleInputChange}
              value={formData.phoneNumber}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber}
              disabled={!editable}
            />
          </Grid>
        </Grid>
        {editable ? (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
            onClick={onClickAddPassenger}
          >
            Add Passenger
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}
      </form>
    </>
  );
};

export default BookingPersonalInfo;
