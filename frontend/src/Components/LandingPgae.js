import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import BackgroundImg from '../img/bg1.jpg';

const Navbar = () => {
    return (
      <Box 
        style={{ 
          backgroundImage: `url(${BackgroundImg})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center', 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <AppBar position="static">
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AgricultureIcon />
              <Typography variant="h6">
                Agro Crops
              </Typography>
            </Box>
            <Box style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/crops-form">Crops</Button>
              <Button color="inherit" component={Link} to="">Yield</Button>
              <Button color="inherit" component={Link} to="">Diseases</Button>
            </Box>
          </Toolbar>
        </AppBar>
        
        <Container 
          maxWidth="lg" 
          style={{ 
            marginTop: '12rem', 
            textAlign: 'center', 
            padding: '2rem', 
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to Agro Crops
          </Typography>
          <Typography variant="body1">
            Here you can find all the information you need about recommended crops according to the environment, yield prediction, and diseases.
            <br />
            Explore our resources and make informed decisions for your agricultural needs.
          </Typography>

          <Button 
            variant="contained" 
            color="primary" 
            style={{ marginTop: '1.5rem' }} 
            component={Link} 
            to="/explore"
          >
            Explore Now
          </Button>
        </Container>
      </Box>
    );
};

export default Navbar;
