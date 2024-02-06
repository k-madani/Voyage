import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {
  iconBtn,
  landingBox,
  loginBtn,
  navIcons,
} from "../../components/Utils/styles";
import MenuIcon from "@mui/icons-material/Menu";

import Logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('common');
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const menuItems = [
    t('user.navbar.miles'),
    t('user.navbar.flightdeals'),
    t('user.navbar.myacc'),
    t('user.navbar.travel'),
  ];

  const handleLogout = () => {
    navigate("/");
  };

  const handleNavBar = (item: string) => {
    if (item == t('user.navbar.myacc')) {
      navigate("/profile");
    } 
    if (item == t('user.navbar.travel')) {
      navigate("/travelMap");
    }
    if (item == t('user.navbar.miles')){
      navigate('/miles');
    }
  };

  return (
    <AppBar position="static" sx={{ background: "white", color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={Logo} alt="Logo" style={{ height: 90, marginRight: 16 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {menuItems.map((item) => (
              <Button
                key={item}
                sx={navIcons}
                onClick={() => handleNavBar(item)}
              >
                {item == "Voyage Drop" ? (
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
  );
};

export default Header;
