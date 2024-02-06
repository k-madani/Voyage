import * as React from 'react';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import Container from '@mui/material/Container';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

const Failure= () =>{
  
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate('/home');

  }
    return(
        <div>
        <Header/>
          <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '50vh' , width:'50vw', marginLeft:'-100px', marginTop:'100px', borderRadius:'20px' }} >
             
        <CreditCardIcon sx={{fontSize:'250px',marginTop:'-20px',marginLeft:'250px',position:'absolute'}}/>   
        <CancelIcon sx={{fontSize:'55px', color:'red',marginTop:'150px',marginLeft:'450px',position:'absolute'}}/> 
        <b style={{fontSize:'30px',marginTop:'200px',marginLeft:'280px',position:'absolute'}}>Payment Error!</b>
        <div style={{fontSize:'20px',marginTop:'250px',marginLeft:'150px',position:'absolute'}}>Sorry your transaction has been failed, Please try again later</div>
        <Tooltip title="Go back to home page">
        <ArrowCircleLeftIcon  onClick={() => handleBackButton() } sx={{fontSize:'60px', top:'300px', position:'relative', left:'370px'} }/></Tooltip>
        </Box>
      </Container>
    </React.Fragment>
          <Footer val={"landing"}/>
    </div>
    )
}

export default Failure