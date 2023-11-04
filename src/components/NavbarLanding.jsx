import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RegisterLayout from 'components/RegisterLayout';
import SignInLayout from 'components/SignInLayout';

function NavbarLanding() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open);
  };

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseDialog = () => {
    setIsRegisterOpen(false);
  };

  const handleOpenDialogSignIn = () => {
    setIsSignInOpen(true);
  };

  const handleCloseDialogSignIn = () => {
    setIsSignInOpen(false);
  };

  const handleSignInHereClick = () => {
    handleCloseDialog(); // Close the RegisterLayout dialog
    handleOpenDialogSignIn(); // Open the SignInLayout dialog
  };

  const handleRegisterHereClick = () => {
    handleCloseDialogSignIn();
    handleOpenDialog();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 'none',
        '@media (max-width: 600px)': {
          backgroundColor: 'rgba(33, 33, 33, 0.8)',
        },
      }}
    >
      <Container maxWidth="">
        <Toolbar disableGutters>
          <a href="/">
            <img
              src={process.env.PUBLIC_URL + '/resource/image/logotujuhsembilan.svg'}
              alt="Talent Center 79 Logo"
              sx={{
                height: '60px',
                marginRight: '20px',
                '@media (max-width: 600px)': {
                  height: '10px',
                },
              }}
            />
          </a>
          <Typography
            href="/"
            sx={{
              ml: 2,
              display: { md: 'flex' },
              fontFamily: 'Poppins',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              lineHeight: '80px',
              textDecoration: 'none',
              fontSize: '22px',
            }}
          >
            Talent Center 79
          </Typography>

          <MenuIcon onClick={toggleDrawer(true)} sx={{ display: { xs: 'right', md: 'none' }, position: 'absolute', right: 1 }} />
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            sx={{ padding: 100, display: { md: 'none' }, '& .MuiDrawer-paper': { backgroundColor: '#2C8AD3', width: '50%' } }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '8px' }}>
              <CloseIcon onClick={toggleDrawer(false)} sx={{ color: 'black', mt: 2, mr: 2 }} />
            </div>
            <div
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                paddingTop: '30px',
              }}
            >
              <Button
                onClick={handleOpenDialog}
                variant="text"
                sx={{ display: { md: 'none' }, fontSize: '14px', fontFamily: 'inter', textTransform: 'none', color: 'white', borderColor: 'white' }}
              >
                Register
              </Button>
              <RegisterLayout open={isRegisterOpen} onClose={handleCloseDialog} onSignInClick={handleSignInHereClick} />
              <Button
                onClick={handleOpenDialogSignIn}
                variant="outlined"
                sx={{
                  fontSize: '14px',
                  fontFamily: 'inter',
                  borderRadius: '20px',
                  display: { md: 'none' },
                  textTransform: 'none',
                  color: 'white',
                  borderColor: 'white',
                }}
              >
                Sign In
              </Button>
              <SignInLayout open={isSignInOpen} onClose={handleCloseDialogSignIn} onRegisterClick={handleRegisterHereClick} />
            </div>
          </Drawer>

          <Button
            onClick={handleOpenDialog}
            variant="text"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontSize: '14px',
              fontFamily: 'inter',
              position: 'absolute',
              right: 110,
              textTransform: 'none',
              marginRight: '10px',
              color: 'white',
              borderColor: 'white',
            }}
          >
            Register
          </Button>
          <RegisterLayout open={isRegisterOpen} onClose={handleCloseDialog} onSignInClick={handleSignInHereClick} />
          <Button
            onClick={handleOpenDialogSignIn}
            variant="outlined"
            sx={{
              fontSize: '14px',
              fontFamily: 'inter',
              borderRadius: '20px',
              display: { xs: 'none', md: 'flex' },
              position: 'absolute',
              right: 20,
              textTransform: 'none',
              marginRight: '10px',
              color: 'white',
              borderColor: 'white',
            }}
          >
            Sign In
          </Button>
          <SignInLayout open={isSignInOpen} onClose={handleCloseDialogSignIn} onRegisterClick={handleRegisterHereClick} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarLanding;
