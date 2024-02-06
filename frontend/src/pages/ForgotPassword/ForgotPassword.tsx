import './ForgotPassword.css';

import React, { useEffect, useState }  from 'react';
import { ToastContainer, toast } from 'react-toastify';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios  from "axios";
import { useNavigate } from 'react-router-dom';

interface user{
    _id: string,
    email: string,
    currentPassword: string,
    previousPasswords:Array<string>,
  }
  

const ForgotPassword: React.FC = () => { 

    const navigate = useNavigate();

        const [showPassword, setShowPassword] = useState<boolean>(false);
        const [currentPassword, setCurrentPassword] = useState<string>('');
        const [email, setEmail] = useState<string>('');
        const [previousPasswords, setPreviousPasswords] = useState<string[]>([]); // Initialize as an empty array
       // const [confirmPassword, setConfirmPasswords] = useState<string>('');

        const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

      const handleTogglePasswordVisibilitys = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

      const handleUpdate = () => {

        if (currentPassword.length <= 8 || currentPassword.length >= 15) {
          
            toast.warning('Password must be atleast 8 characters and no more than 15 characters!', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: true,
            });
            return;
          }

        if (previousPasswords.includes(currentPassword)) {
          
          toast.warning('Current password cannot be the same as previous passwords!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
          });
          return;
        }

      const updatedPreviousPasswords = [...previousPasswords, currentPassword];
      axios
      .post(`http://localhost:4000/forgotPassword`, { email, currentPassword } )
        .then((response) => {
          // Handle success, e.g., show a success message
          console.log('Password updated successfully');
          toast.success('User updated successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
          });
          setPreviousPasswords(updatedPreviousPasswords);
          
        })
        .catch((error) => {
          var errMsg = error.code === "ERR_BAD_REQUEST" ? "Current password cannot be the same as previous passwords!" : "Error while updating Password. Please try again."; 
          
          // Handle error, e.g., show an error message
          console.error('Error updating Password', error);
          toast.error(errMsg, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
          });
        });
    };

    const handleBackButton = () => {
        navigate('/login');
      }


    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
         <Box sx={{ bgcolor: '#1c3c74', height: '80vh', marginTop:'70px', borderRadius:'10px' }} >
         <div className='title'>Create new password</div>
         <div className='title2'>Your new password must be different
         from previous used password</div>
         <div className='email-title' style={{ fontWeight: 'bold' }}>EMAIL</div>
            <TextField className="emails-text" style={{width:'75%'}} variant="filled" placeholder='Email' value={email}
            onChange={(e) => setEmail(e.target.value)}/> 
         <div className='password-title' style={{ fontWeight: 'bold' }}>PASSWORD</div>
            <TextField className="forgotpassword-text" style={{width:'75%'}} variant="filled" type={showPassword ? 'text' : 'password'}
            placeholder='New Password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}/> 
            <div className='password-fp'>Must be atleast 8 characters.</div>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <Stack className='ResetPassword' direction="row" spacing={2}>
            <Button sx={{ fontWeight: 'bold', fontSize:'18px' }} variant="contained" onClick={handleUpdate}>Reset Password</Button>
            </Stack>
         </Box>
        </Container>
        <Tooltip title="Back to login page" placement="top-start">
          <ArrowCircleRightIcon className='arrowBackIcons' onClick={()=>handleBackButton()} />
          </Tooltip>
      </React.Fragment>
    );
}

export default ForgotPassword