import * as React from 'react';

import { Box, Button, CardMedia, Container, Typography } from '@mui/material';

import AboutLogo from '../../assets/cook-islands.jpg';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import StarRateIcon from '@mui/icons-material/StarRate';
import TravellingGroup from '../../assets/Travelling-Group.jpg';
import image from '../../assets/background.png';
import { useNavigate } from 'react-router-dom';
import video from '../../assets/videoAbout.mp4';

const About = () => {
    const navigate = useNavigate();
    const handleGetStartedClick = () => {
        navigate('/register');
      };
    return(
        <React.Fragment>
      <CssBaseline />
      <Header/>
      <Container maxWidth="sm">
      <Box sx={{height: '120vh', width:'99.9vw', marginLeft:'-500px',marginTop:'1px', backgroundImage: `url(${image})`, position:'relative' }} >
      <p style={{fontSize:'45px', fontWeight:'bold', fontFamily:'cursive', marginLeft:'200px', top:'100px', position:'absolute'}}>Voyage is helping people <br /> spend less and travel more.</p>
      <p style={{fontSize:'20px', fontWeight:'bold', fontFamily:'serif', marginLeft:'200px', top:'300px', position:'absolute', color:'gray'}}>Get notified of the best flight deals from your home airport to your<br /> dream destinations. Our users save an average of $450 on every <br />flight booked.</p>
      <Button variant="contained" onClick={handleGetStartedClick}  sx={{position:'absolute', top:'450px',marginLeft:'200px',width:'200px', height:'70px', fontWeight:'bold', fontSize:'15px'}}>
                Get Started Now
      </Button>
      <p style={{fontSize:'20px', fontWeight:'bold', fontFamily:'serif', marginLeft:'200px', top:'550px', position:'absolute', color:'gray'}}><b style={{color:'navy', fontSize:'25px'}}>$450 </b>  saved per<br />flight on average</p>
      <div style={{ borderLeft: '2px solid #000', height: '80px', position:'absolute',marginLeft:'400px', top:'570px', }}></div>
      <p style={{fontSize:'20px', fontWeight:'bold', fontFamily:'serif', marginLeft:'450px', top:'555px', position:'absolute', color:'gray'}}><b style={{color:'navy'}}>Hundreds</b> of  <br /><b style={{color:'orange'}}><StarRateIcon/><StarRateIcon/> <StarRateIcon/><StarRateIcon/><StarRateIcon/></b><br />Reviews</p>
      <img src={AboutLogo} alt="Logo" style={{ height: '500px',marginLeft:'940px', top:'150px', position:'absolute',borderRadius:'10px' }} />
    </Box>    
    <img src={TravellingGroup} alt="Logo" style={{ height: '500px', width:'1600px', opacity:'0.2', marginLeft:'-570px' }} />
    <video src={video} autoPlay muted loop className="video-about" style={{ height: '350px', width:'1500px', marginLeft:'-800px', position:'absolute', top:'1030px' }}></video>
    <div style={{position:'absolute', top:'110%', padding:'200px', left:'700px', fontFamily:'Helvetica Neue'}}>
    <b>Welcome to Voyage</b>
    <p>Hey there! We're Arpitha, Krishna, Preeti and Zakir, a team of passionate master's students from Northeastern University. Our love for exploration and global cultures has led us to incredible places around the world</p>
    <p>In 2023, fueled by our shared passion, we set out on this journey as students seeking adventure beyond textbooks. Fast forward to today, and we've explored diverse landscapes, experienced unique cultures, and formed an amazing community. Join us as we share travel insights, academic-life balance tips, and the joy of discovery. Let's explore the world together!</p>
    <p>Safe travels,<br/>
     Arpitha, Krishna Preeti, and Zakir ✈️</p>
    </div>
    <div style={{marginTop:'10%', padding:'0px', left:'700px', fontFamily:'Helvetica Neue', fontSize:'25px'}}>
    <b style={{alignContent:'center', position:'relative', left:'180px'}}>How it works</b>
    <p style={{ fontStyle:'italic'}}>We have a team of flight experts who look through flight data daily and select only the best deals. If those deals match your travel preferences, we’ll notify you via email. Simply click on your deal notification and book directly with the airline. Enjoy the savings so you can travel more and spend less!</p>

    </div>
    

      </Container>
      <Footer val={"landing"}/>
    </React.Fragment>
    );

}

export default About