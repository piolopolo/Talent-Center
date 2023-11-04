import { useState } from 'react';
import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormControl,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Close, CheckBox, DisabledByDefault } from '@mui/icons-material';
import { registerUser } from 'apis';
import RegisterAlert from './GlobalAlert';

function RegisterLayout(props) {
  const { open, onClose, onSignInClick } = props;

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const [numberValidated, setNumberValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);

  const handleChange = (value) => {
    const number = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
    const length = /(?=.{8,})/;
    if (number.test(value)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }
    if (length.test(value)) {
      setLengthValidated(true);
    } else {
      setLengthValidated(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const handleRegistration = async () => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordValidation = document.getElementById('password-validation').value;

    if (password === passwordValidation) {
      const registrationData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        sex: 'P',
        birthdate: '2002-10-10',
        agencyName: 'Pt. XXXX',
        agencyAddress: 'Bandung',
      };

      try {
        const success = await registerUser(registrationData);

        if (success) {
          console.log('Register successful');
          setAlertOpen(true);
          setAlertMessage('Register successful!');
          setAlertSeverity('success');
          onSignInClick(); // You need to define the onSignInClick function
        } else {
          // Handle registration failure
          setAlertOpen(true);
          setAlertMessage('An error occurred during registration operation. Try again later');
          setAlertSeverity('error');
        }
      } catch (error) {
        // Handle registration error
        console.error('Error handling registration:', error);
        setAlertOpen(true);
        setAlertMessage('An error occurred during registration operation. Try again later');
        setAlertSeverity('error');
      }
    } else {
      setAlertOpen(true);
      setAlertMessage('Password and password validation must be match');
      setAlertSeverity('error');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <RegisterAlert open={alertOpen} onClose={() => setAlertOpen(false)} str={alertMessage} severity={alertSeverity} />

      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>
          <DialogActions>
            <IconButton onClick={onClose} aria-label="close">
              <Close />{' '}
            </IconButton>
          </DialogActions>

          <Typography fontSize={'14pt'} textAlign={'center'} fontWeight={'bold'}>
            Register{' '}
          </Typography>
          <Typography fontSize={'10pt'} textAlign={'center'}>
            Register so you can choose and request our talent
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField id="firstName" placeholder="First Name" size="small" fontSize="9pt" />
            </Grid>
            <Grid item xs={6}>
              <TextField id="lastName" placeholder="Last Name" size="small" />
            </Grid>
          </Grid>

          <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
            <TextField id="email" placeholder="Email" type="email" size="small" />
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
            <TextField
              id="password"
              placeholder="Password"
              size="small"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => handleChange(e.target.value)}
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

          <FormControl fullWidth sx={{ mt: 1 }}>
            <Typography fontSize={'9pt'} style={{ color: lengthValidated ? 'green' : 'grey' }}>
              {lengthValidated ? <CheckBox size="small" color="green" /> : <DisabledByDefault color="grey" />}
              Password is at least 8 characters long
            </Typography>
            <Typography fontSize={'9pt'} style={{ color: numberValidated ? 'green' : 'grey' }}>
              {numberValidated ? <CheckBox size="small" color="green" /> : <DisabledByDefault color="grey" />}
              Password contains at least one letter and one number
            </Typography>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
            <TextField
              id="password-validation"
              placeholder="Type in your password again"
              size="small"
              type={showPassword2 ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword2} onMouseDown={handleMouseDownPassword2} edge="end">
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <Button variant="contained" style={{ textTransform: 'capitalize' }} onClick={handleRegistration}>
              Register
            </Button>
          </FormControl>

          <Divider sx={{ my: 2 }} />

          <FormControl fullWidth sx={{}}>
            <Button variant="outlined" startIcon={<Google />} style={{ textTransform: 'capitalize' }}>
              Continue With Google
            </Button>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <Typography fontSize={'9pt'} textAlign={'center'}>
              Already have an Account?{' '}
              <Button variant="text" style={{ textTransform: 'capitalize' }} onClick={onSignInClick}>
                Sign In Here
              </Button>{' '}
            </Typography>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RegisterLayout;
