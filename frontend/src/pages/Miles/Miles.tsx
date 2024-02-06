import "./Miles.css";

import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Progressbar from "../../components/Progressbar/Progressbar";
import { RootState } from '../../store';
import Tooltip from '@mui/material/Tooltip';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import axios  from "axios";
import image from '../../assets/background.png';
import mainImage from '../../assets/loginbackground.jpg';
import { useNavigate } from 'react-router-dom';
import webpImage from '../../assets/flightgif.gif';

interface userDetails {
  id: string,
  token: string,
  type: string
}

const Miles: React.FC = () => {
  const userState: userDetails | null = useSelector((state: RootState) => state.user);
    const [progress, setProgress] = useState(0);
    const [miles, setMiles] = useState<number>(0);
    const [rem, setRem] = useState<number>(0);
    const navigate = useNavigate();
    useEffect(() => {
        const id = setInterval(() => {
            setProgress(Math.random()*100);
        },3000);
        return () => {
            clearInterval(id);
        }
    },[]);
    var userId = "";
    var userToken = "";
    var type = "";
    
    console.log(userState);
    if(userState != null){
      userId = (userState as userDetails).id;
      userToken = (userState as userDetails).token;
      type = (userState as userDetails).type;
      console.log(userToken);
    }
    axios.get(`http://localhost:4000/miles`,{
      headers: {
        authorization: `Bearer ${userToken}`
      }
    }) // Replace with your actual API endpoint
    .then((response) => {
        const user = response.data;
        setMiles(user.milePoints);
        setRem(1000 - miles);
    });
    console.log(miles,rem);
    

    const handleBackButton = () => {
        navigate('/home');

      }
    return(
        <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Box sx={{
          position: 'relative',
          zIndex: '-1',
          height: '50vh',
          width: '100vw',
          marginLeft: '-192px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'top',
          justifyContent: 'center',
          color: '#fff', // Adjust text color if needed
          fontSize: '50px', // Adjust font size if needed
          fontWeight: 'bold', // Add font weight
          fontFamily:'serif',
          textShadow:'0 0 15px #001F3F',
          backgroundImage: `url(${mainImage})`
        }} >
            <img src={webpImage} alt="WebP Image" height={100} className="gif"/>
            My Miles Rewards
          </Box>
          <WorkspacePremiumIcon className="medal" sx={{zIndex:'1', color:'orange'}}/>
          <Box sx={{height: '50vh', width:'50vw', marginLeft:'200px', position:'absolute', zIndex:'0', marginTop:'-230px', backgroundImage: `url(${image})`,borderRadius:'20px' }} >
          <div>
        <p className="tag1">{type}</p>
        <p className="tag2">{miles} POINTS</p>
        <p className="price-description">Earn purchase earn points equal 7% of total</p>
        <Progressbar />
        <p className="price-status">Spend {rem} to unlock ADVENTURER status</p>
        {/* Additional UI elements or text if needed */}
      </div>
          </Box>
        </Container>
        <Tooltip title="Back to home page">
        <ArrowCircleRightIcon sx={{top:'-470px',left:'1400px', fontSize:'50px', position:'relative' }} onClick={()=>handleBackButton()} />
    </Tooltip>
        
      </React.Fragment>
    )
}


export default Miles;