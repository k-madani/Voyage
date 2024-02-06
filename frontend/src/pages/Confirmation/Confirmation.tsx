import './Confirmation.css';

import * as React from 'react';

import { Button, Typography } from '@mui/material';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Box from '@mui/material/Box';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import LocalAirportRoundedIcon from '@mui/icons-material/LocalAirportRounded';
import Logo from "../../assets/logo.svg";
import Tooltip from '@mui/material/Tooltip';
import { relative } from 'path';
import { useNavigate } from 'react-router-dom';

const Confirmation: React.FC  = () => {
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate('/home');

  }

  

return(
    
    <div>
        <Header/>
          <p className='Thankyou-statement'>Thank you for booking with us! <br />Payment Successfully done! </p>
          <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '50vh' , width:'50vw', marginLeft:'-100px', marginTop:'100px', borderRadius:'20px' }} >
        <CheckCircleRoundedIcon sx={{fontSize:'55px', color:'green',marginTop:'-30px',marginLeft:'350px',position:'absolute'}}/>
        <LocalAirportRoundedIcon sx={{fontSize:'40px', marginTop:'180px', marginLeft:'350px'}}/>
        </Box>
      </Container>
    </React.Fragment>
          <Footer val={"landing"}/>
    </div>
)
}

export default Confirmation
