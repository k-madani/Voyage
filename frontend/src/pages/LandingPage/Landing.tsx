import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../assets/logo.svg';
import SendIcon from '@mui/icons-material/Send';
import Faq from '../../components/FAQ/Faq';
import { loginBtn,iconBtn,navIcons, landingBox } from '../../components/Utils/styles';
import HowItWorks from '../../components/HowItWorks/Works';
import Flight from '../../components/FlightImage/Flight';
import MembershipComparison from '../../components/CompareMembership/CompareMembership';
import Footer from '../../components/Footer/Footer';
import { useNavigate,useLocation,Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Landing: React.FC = () => {

  const { t } = useTranslation('common');
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  React.useEffect(() => {
    const targetId = location.hash.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const menuItems = [t('navbar.membership.label'), t('navbar.userguide.label'), t('navbar.faq.label'), t('navbar.voyagedrop.label')];

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleGetStartedClick = () => {
    navigate("/register");
  };
  const handleNavBar = (item:string) =>{
    if (item == t('navbar.voyagedrop.label')){
      navigate('/subscribe');
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
              <Button key={item}  component={Link} to={item == t('navbar.voyagedrop.label') ? '/subscribe' :`#${item.toLowerCase().replace(' ', '-')}`} sx={navIcons}>
                {item == t('navbar.voyagedrop.label') ? <><IconButton
                        size="large"
                        sx={iconBtn}>
            <SendIcon sx={{ color: '#4682B4' }} />
          </IconButton> {item}</>  : item}
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
                <Button key={item} sx={navIcons}>
                  {item == t('navbar.voyagedrop.label') ? (
                    <>
                      <IconButton size="large" sx={iconBtn}>
                        <SendIcon sx={{ color: "#4682B4" }} />
                      </IconButton>{" "}
                      {item}
                    </>
                  ) : (
                    item
                  )}
                </Button>
              ))}
              </Menu>
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
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
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

            <Button
              variant="contained"
              color="primary"
              sx={loginBtn}
              onClick={handleLoginClick}
            >
              {t('login.button')}
            </Button>

          <Button
            variant="outlined"
            color="primary" 
            onClick={handleGetStartedClick}
          >
            {t('getstarted.button')}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
    <Flight />
    <Box id="user-guide" sx={{ paddingTop: '64px' }}>
    <HowItWorks />
    </Box>
    <Box id="membership" sx={{ paddingTop: '64px' }}>
    <MembershipComparison />
    </Box>
    <Box id="faq" sx={{ paddingTop: '64px' }}>
    <Faq />
    </Box>
    <Footer val={"landing"}/>
    </>
  );
};

export default Landing;
