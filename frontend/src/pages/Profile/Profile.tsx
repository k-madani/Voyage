import './Profile.css';

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Flight from '../../components/FlightImage/Flight';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import flight from '../../assets/26315-7-airplane-transparent.png';
import { response } from 'express';
import { useNavigate } from 'react-router-dom';
import video from '../../assets/clouds.mp4';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

interface user {
  _id: string,
  email: string,
  firstName: string,
  lastName: string,
  contact: string,
  currentPassword: string,
  previousPasswords: Array<string>,
  milePoints: string,
  userType: string
}
interface userDetails {
  id: string,
  token: string
}

const Profile: React.FC = () => {
  const user1 = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  //const [searchedUser, setSearchedUser] = useState<user | undefined>();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [milePoints, setMilePoints] = useState<string>('');
  const [userType, setUserType] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  //const [previousPasswords, setPreviousPasswords] = useState<string[]>([]); // Initialize as an empty array
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [emailError, setEmailError] = useState<string>('');
  //const [showPassword, setShowPassword] = useState<boolean>(false);



  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };




  // Add this function to reset the form
  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setContact('');
    setEmail('');
    setMilePoints('');
    setUserType('');
    setCurrentPassword('');
    // setShowPassword(false);
  };

  // const handleTogglePasswordVisibility = () => {
  //   setShowPassword((prevShowPassword) => !prevShowPassword);
  // };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value || emailRegex.test(value)) {
      setEmailError('');
    } else {
      setEmailError('Enter a valid email address');
    }
  };

  const handleClose = (del: Number) => {
    if (del) {
      var userId = "";
      var userToken = "";
      if (user1 != null) {
        userId = (user1 as userDetails).id;
        userToken = (user1 as userDetails).token;
      }
      axios.delete(`http://localhost:4000/user/${userId}`, {
        headers: {
          authorization: `Bearer ${userToken}`
        }
      })
        .then((response) => {
          console.log('user deleted successfully');
          toast.success('User deleted successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
          });
          resetForm();
        })
        .catch((error) => {
          // Handle error, e.g., show an error message
          console.error('Error delete user data', error);
          toast.error('Error while deleting the user. Please try again.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
          });
        });
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    // Make an API call to fetch offers when the component mounts
    var userId = "";
    var userToken = "";
    if (user1 != null) {
      userId = (user1 as userDetails).id;
      userToken = (user1 as userDetails).token;
    }

    axios.get(`http://localhost:4000/user`, {
      params: {
        id: userId
      },
      headers: {
        authorization: `Bearer ${userToken}`
      }
    }).then((response) => {
      const userData = response.data;
      //setSearchedUser(userData);

      // Populate the state with user data
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setContact(userData.contact);
      setEmail(userData.email);
      setMilePoints(userData.milePoints);
      setUserType(userData.userType);
      setCurrentPassword(userData.currentPassword);
    })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error('Error fetching user data', error);

      });
  }, []);

  const handleUpdate = () => {
    // Update the user data in the database 
    var userId = "";
    var userToken = "";
    if (user1 != null) {
      userId = (user1 as userDetails).id;
      userToken = (user1 as userDetails).token;
    }
    axios
      .put(`http://localhost:4000/user/${userId}`, { firstName, lastName, contact, email, milePoints, userType, 
          currentPassword},{
        headers: {
          authorization: `Bearer ${userToken}`
        }
      })
      .then((response) => {
        // Handle success, e.g., show a success message
        console.log('User data updated successfully');
        toast.success('User updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
        });
        // setPreviousPasswords(updatedPreviousPasswords);

      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error('Error updating user data', error);
        toast.error('Error while updating the user. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
        });
      });
  };

  const handleBackButton = () => {
    navigate('/home');

  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed className='main-container'>
        <div className="profile-gif">
          <div className="video-profile">
            <video src={video} autoPlay muted loop className="thevideo"></video>
          </div>
          <img src={flight} alt="Flight" className="plane-profile" />
        </div>
        <div className='Heading'></div>
        <div className='common'>
          <div className='Heading1'>MY</div>
          <div className='Heading2'>PROFILE</div>
        </div>
        <div className='adjust'>
          <div className='first-name'>FIRST NAME</div>
          <TextField className="first-name-text" label="First Name" variant="filled"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} />
          <div className='last-name'>LAST NAME</div>
          <TextField className="last-name-text" label="Last Name" variant="filled"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} />
          <div className='phone'>PHONE</div>
          <TextField className="phone-text" label="Phone Number" variant="filled"
            value={contact}
            onChange={(e) => setContact(e.target.value)} />
          <div className='email'>E-MAIL</div>
          <TextField className="email-text" label="E-Mail" variant="filled" type="email"
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
          />
          <div className='mile-points'>MILE POINTS</div>
          <TextField className="mile-points-text" variant="filled" contentEditable="false"
            value={milePoints}
            onChange={(e) => setMilePoints(e.target.value)}
            InputProps={{ readOnly: true }} />
          <div className='user-category'>USER CATEGORY</div>
          <TextField className="user-category-text" variant="filled"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            InputProps={{ readOnly: true }} />
          {/* <div className='password-profile'>PASSWORD</div>
            <TextField className="password-text" variant="filled" type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}/> */}
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <Stack className='buttons' direction="row" spacing={2}>
          <Button sx={{ fontWeight: 'bold', fontSize: '18px' }} color="success" variant="outlined" onClick={handleUpdate}>UPDATE</Button>
          <Button sx={{ fontWeight: 'bold', fontSize: '18px' }} variant="outlined" color="error" aria-describedby={id} onClick={handleClick}>
            DELETE
          </Button>
          <Popover className='popup'
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}

            sx={{
              '& .MuiPopover-paper': {
                // Increase the size here
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Align items (including Typography) in the center
                justifyContent: 'space-between', // Add space between items
                padding: '16px', // Adjust padding as needed
                width: '200px', // Set your desired width
                height: '150px', // Set your desired height
              },
            }}>
            <Typography sx={{ p: 2, marginLeft: 1 }}>Are you sure?</Typography>
            <Stack spacing={2} direction="row">
              <Button onClick={() => handleClose(1)} variant="outlined">Yes</Button>
              <Button onClick={() => handleClose(0)} variant="outlined">No</Button>
            </Stack>

          </Popover>
        </Stack>
      </Container>
      <Tooltip title="Back to home page" placement="top-start">
        <ArrowCircleRightIcon className='arrowBackIcon' onClick={() => handleBackButton()} />
      </Tooltip>
    </React.Fragment>
  );

}
export default Profile