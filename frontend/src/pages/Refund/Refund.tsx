import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import RefundPolicy from '../../components/RefundPolicy/RefundPolicy';

const Refund = () => {
    return(
        <React.Fragment>
      <CssBaseline />
      <Header/>
      <Container maxWidth="sm">
        <Box sx={{}} > 
        <RefundPolicy/>           
        </Box>
      </Container>
      <Footer val={"landing"}/>
    </React.Fragment>
    );

}

export default Refund