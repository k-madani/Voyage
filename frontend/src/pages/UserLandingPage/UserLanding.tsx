import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import { iconBtn, landingBox, loginBtn, navIcons, searchFlightDiv, searchFlightHeading, userGreeting } from '../../components/Utils/styles';

import Explore from '../../components/Explore/Explore';
import Footer from '../../components/Footer/Footer';
import Logo from '../../assets/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import Offers from '../../components/Offers/Offers';
import React from 'react';
import SearchFlights from '../../components/SearchFlights/SearchFlights';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import webpImage from '../../assets/flightgif.gif';
import { useDispatch, useSelector } from 'react-redux';
import {setUser, clearUser} from "../../redux/reducers/userReducer";
import { useTranslation } from 'react-i18next';

  

const UserLanding: React.FC = () => {

  const { t } = useTranslation('common');
    
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const menuItems = [t('user.navbar.miles'), t('user.navbar.flightdeals'), t('user.navbar.myacc'), t('user.navbar.travel')];
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  const handleNavBar = (item:string) =>{
  if (item == t('user.navbar.myacc')){
    navigate('/profile');
  }
  if (item == t('user.navbar.miles')){
    navigate('/miles');
  }
  if (item ==  t('user.navbar.travel')){
    navigate('/travelMap');
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

            <Button
              variant="contained"
              color="primary"
              sx={loginBtn}
              onClick={handleLogout}
            >
              {t('btn.signout.label')}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Typography variant="h6" sx={userGreeting}>
             {t('user.heading.label')}
            </Typography>
            <Box style={searchFlightDiv} >
            <img src={webpImage} alt="WebP Image" height={70}/>
            <Typography variant="h6" sx={searchFlightHeading}>
                {t('user.heading.label.2')}
            </Typography>
            </Box>
            
        <SearchFlights />
        <Explore />
        <Offers />
      <Footer val={"home"} />
      
    </>
  );
};

export default UserLanding;
