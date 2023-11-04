import { useState } from 'react';
import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormControl,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { signInUser } from 'apis';
import SignInAlert from './GlobalAlert';

function SignInLayout(props) {
  const { open, onClose, onRegisterClick } = props;
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' && password === '') {
      setAlertOpen(true);
      setAlertMessage('Kolom Email dan password tidak boleh kosong');
      setAlertSeverity('error');
    } else if (email === '') {
      setAlertOpen(true);
      setAlertMessage('Kolom email tidak boleh kosong');
      setAlertSeverity('error');
    } else if (password === '') {
      setAlertOpen(true);
      setAlertMessage('Kolom password tidak boleh kosong');
      setAlertSeverity('error');
    } else {
      console.log(email, password);
      signInUser(email, password)
        .then((response) => {
          let alertMessage = 'Log in failed. An error occurred.';
          let alertSeverity = 'error';

          if (response.status === 200) {
            console.log('Sign-in successful');
            alertMessage = 'Login successful!';
            alertSeverity = 'success';

            if (window.location.pathname === '/main') {
              window.location.reload();
            } else {
              navigate('/main'); // Anda perlu mendefinisikan fungsi navigate
            }
            onClose();
          } else if (response.data && response.data.detail) {
            alertMessage = 'Log in failed. ' + response.data.detail;
          }

          setAlertOpen(true);
          setAlertMessage(alertMessage);
          setAlertSeverity(alertSeverity);
        })
        .catch((error) => {
          let alertMessage = 'Log in failed. An error occurred.';
          if (error.response && error.response.data && error.response.data.detail) {
            alertMessage = 'Log in failed. ' + error.response.data.detail;
          } else {
            console.error('Error during sign-in:', error);
          }

          setAlertOpen(true);
          setAlertMessage(alertMessage);
          setAlertSeverity('error');
        });
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <SignInAlert open={alertOpen} onClose={() => setAlertOpen(false)} str={alertMessage} severity={alertSeverity} />

      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>
          <DialogActions>
            <IconButton data-testid="close-signin-modal-button" onClick={onClose} aria-label="close">
              <Close />{' '}
            </IconButton>
          </DialogActions>

          <Typography fontSize={'14pt'} textAlign={'center'} fontWeight={'bold'}>
            Welcome Back
          </Typography>
          <Typography fontSize={'10pt'} textAlign={'center'}>
            Please sign in first to explore further on our website
          </Typography>
        </DialogTitle>

        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
            <TextField id="email" placeholder="Email" type="email" size="small" />
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
            <TextField
              id="password"
              placeholder="Password"
              size="small"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <Button variant="contained" style={{ textTransform: 'capitalize' }} onClick={handleSignIn}>
              Login
            </Button>
          </FormControl>

          <Divider sx={{ my: 2 }} />

          <FormControl fullWidth sx={{}}>
            <Button variant="outlined" startIcon={<Google />} style={{ textTransform: 'capitalize' }}>
              Log In with Google
            </Button>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <Typography fontSize={'9pt'} textAlign={'center'}>
              Don't have an Account?{' '}
              <Button onClick={onRegisterClick} variant="text" style={{ textTransform: 'capitalize' }}>
                Register Here
              </Button>{' '}
            </Typography>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SignInLayout;
