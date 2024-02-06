import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    TextField,
    Toolbar,
    Typography
  } from '@mui/material';
  import { iconBtn, landingBox, loginBtn, navIcons, flightEmail, flightPaper,flightHeading,flightDeals,subcscribePara} from '../../components/Utils/styles';

  import Footer from '../../components/Footer/Footer';
  import Logo from '../../assets/logo.svg';
  import MenuIcon from '@mui/icons-material/Menu';
  import React, { useState } from 'react';
  import SendIcon from '@mui/icons-material/Send';
  import { useNavigate } from 'react-router-dom';
  import { styled } from '@mui/system';
  import flight from '../../assets/pexels-photo-358319.jpeg';
  import c3 from "../../assets/c3.jpeg";
  import noti from "../../assets/SJt7rAEAEn.gif";
  import './Subscribe.css';
  import dest from "../../assets/dest-pin.jpeg";
  import alert from "../../assets/alert.gif";
  import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../store'; 

interface userDetails {
  id: string,
  token: string,
  type: string
}


const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  width: '600px',
  textAlign: 'center',
});

const StyledTextField = styled(TextField)({
    marginBottom: '20px',
    
    '& .MuiOutlinedInput-root': {
        color: '#ffffff',
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
});

const StyledButton = styled(Button)({
  marginTop: '10px',
  
});

const Subscribe: React.FC = () => {
  const [email, setEmail] = useState('');
  const user1 = useSelector((state: RootState) => state.user);

  const handleSubscribe = async () => {
    const data = {
        email: email,
        type: "subscriber"
    }
    try {
        
        var userToken = "";
        if(user1 != null){
          userToken = (user1 as userDetails).token;
        }
        await axios.post('http://localhost:4000/subscribe', data);
        toast.success('Subscription Successful!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
          });
          navigate('/');
      } catch (error) {
        toast.error('Subscription Failed. Please try again.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
          });
      }
  };
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const menuItems = ['Flight Deals', 'Home'];

  

  const handleNavBar = (item:string) =>{
  if (item == 'Flight Deals' || item == 'Home'){
    navigate('/');
  }

  }
  return (
    <>
    <AppBar position="static" sx={{ background: 'white', color: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={Logo} alt="Logo" style={{ height: 90, marginRight: 16 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item) => (
              <Button key={item} sx={navIcons} onClick={()=>handleNavBar(item)}>
                {item}
              </Button>
            ))}
          </Box>
          <Box sx={landingBox}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {menuItems.map((item) => (
                <MenuItem key={item} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{item}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </Container>
      </AppBar>
      <img src={flight} alt="Flight" className="plane-email" />
      <StyledContainer sx={flightEmail}>
      <StyledPaper sx={flightPaper} >
        <Typography sx={flightHeading} gutterBottom>
          Subscribe to Voyage Newsletter
        </Typography>
        <Typography sx={flightDeals}  paragraph>
          Get the latest travel deals and updates straight to your inbox!
        </Typography>
        <form>
        <StyledTextField
            label="Enter your email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleSubscribe}
          >
            Subscribe
          </StyledButton>
        </form>
      </StyledPaper>
    </StyledContainer>
    <Typography sx={subcscribePara}>
    Stay in the loop with the latest travel insights, exclusive deals, and exciting updates by subscribing to our newsletter. 
    <br />
    Receive personalized notifications, travel tips, and more, straight to your inbox.
    <br />
    <span className='email-span'>Benefits of Subscribing:</span>
    <br />
        <img src={c3} style={{width: '80px'}} alt="" /><br />
     <span className='email-span'>Exclusive Offers:</span> Be the first to access special deals and promotions. <br />
     <img src={noti} style={{width: '80px'}} alt="" /><br />
     <span className='email-span'>Event Updates:</span> Stay informed about travel events and seasonal highlights. <br />
     <img src={dest} style={{width: '80px'}} alt="" /><br />
     <span className='email-span'>Destination Tips:</span> Receive expert tips on must-visit places and hidden gems. <br />
     <img src={alert} style={{width: '80px'}} alt="" /><br />
     <span className='email-span'>Flight Alerts:</span> Get notified about the latest flight deals that match your preferences. <br />
    </Typography>
    <Footer val={"home"}/>
    </>
    
  );
};

export default Subscribe;
