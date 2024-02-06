import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import PrivacyPolicy from '../../components/PrivacyPolicy/PrivacyPolicy';

const Privacy: React.FC  = () => {
    return(
        <React.Fragment>
      <CssBaseline />
      <Header/>
      <Container maxWidth="sm">
        <Box sx={{width:'50vw', marginLeft:'-100px' }} > 
        <PrivacyPolicy/>           
        </Box>
      </Container>
      <Footer val={"landing"}/>
    </React.Fragment>
    );

}

export default Privacy