import { Box, Button, CardMedia, Container, Typography } from '@mui/material';
import { footerIcons, footerImage, footerImageContent, footerImageText, footerLinks, footerLinksVariant, footerMenu, footerStyle, loginBtn } from '../Utils/styles';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Logo from '../../assets/logo-white.svg';
import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useTranslation } from 'react-i18next';

import background from '../../assets/background.png';
import { useNavigate } from 'react-router-dom';

interface FooterProps {
  val: string,
}


const Footer: React.FC<FooterProps> = (props) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate('/register');
  };
  const handleOffersClick = () => {
    // navigate('/offers');
  };

  const handlePrivacyButton = () => {
    navigate('/privacypolicy');

  }

  const handleRefundButton = () => {
    navigate('/refundpolicy');

  }

  const handleAboutButton = () => {
    navigate('/about');

  }

  const handleTermsButton = () => {
    navigate('/termsofservices');

  }

  return (
    <Box sx={footerStyle}>
        <CardMedia
              component="img"
              src={background} 
              sx={footerImage}
            />
        <Box sx={footerImageContent}>
            {props.val == "landing" ? <><Typography sx={footerImageText}>
                {t('landing.footer.label')} <br /> {t('landing.footer.label.2')}
            </Typography>
            <Button variant="contained" sx={loginBtn} onClick={handleGetStartedClick}>
                {t('landing.button.footer')}
            </Button></> : <><Typography sx={{ marginTop: '3%', color: '#4682B4', fontSize: '2rem', fontWeight: 700}}>
        {t('footer.follow.us.on')} <br />
        <InstagramIcon sx={footerIcons} />
        <FacebookIcon sx={footerIcons} />
        <TwitterIcon sx={footerIcons} />
        <YouTubeIcon sx={footerIcons} />
      </Typography></>}
        </Box>
      <Container maxWidth="lg" sx={footerMenu}>
        <img src={Logo} alt="Logo" style={{ height: 90, marginRight: 16 }} />
        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', mt: 2 }}>
          <a href="#" style={footerLinks} onClick={handleAboutButton}>{t('footer.about')}</a> •
          <a href="#" style={footerLinksVariant} onClick={handlePrivacyButton}>{t('footer.privacy.policy')}</a> •
          <a href="#" style={footerLinksVariant} onClick={handleTermsButton}>{t('footer.terms.of.service')}</a> •
          <a href="#" style={footerLinksVariant} onClick={handleRefundButton}>{t('footer.refund.policy')}</a> 
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
