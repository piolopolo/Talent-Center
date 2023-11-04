import { useCallback, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';

import BoxContainer from '@astarx-studio/mui/components/BoxContainer';
import { useAuthManager, useIdentity } from '@astarx-studio/react-core/auth';

import { login } from 'apis';

const LoginLayout = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useIdentity();

  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });

  const handleTextChange = useCallback(
    (field) => (event) => {
      setFormState((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    },
    []
  );

  const { register } = useAuthManager();
  const handleLogin = useCallback(() => {
    login({
      ...formState,
    })
      .then(({ username, password, grants }) => {
        register({
          username, // required
          password, // optional
          grants, // required
        });
        navigate(`/admin/dashboard`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [register, navigate, formState]);

  if (isLoggedIn) return <Navigate to="/admin/dashboard" />;
  return (
    <BoxContainer fit="stretch-to-view">
      <BoxContainer sx={{ position: 'absolute', height: '100%', width: '50%', bgcolor: '#191B99', zIndex: -1 }} />
      <BoxContainer sx={{ position: 'absolute', height: '100%', width: '50%', left: '50%', zIndex: -1 }} />
      <BoxContainer fit="stretch-to-view" sx={{ zIndex: 1, display: 'flex', alignItems: 'center' }}>
        <Grid container direction="row" alignItems="flex-start" justifyContent="center">
          <Grid item xs={6}>
            <Container maxWidth="md">
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Box sx={{ height: 120, width: 120, bgcolor: '#fff' }} />
                </Grid>
                <Grid item sx={{ color: '#fff' }}>
                  <Typography variant="h6">
                    Lorem Ipsum Dolor Sit Amet Blabla Blabla
                    <br />
                    Blabla Juga
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={6}>
            <Container maxWidth="sm">
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h6">
                    <b>Back to Home</b>
                  </Typography>
                </Grid>
                <Grid item m={4} />
                <Grid item>
                  <Typography variant="h4">
                    <b>Login</b>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">Silakan masuk untuk melanjutkan</Typography>
                </Grid>
                <Grid item m={2} />
                <Grid item container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="body1">User Name</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Input User Name"
                      value={formState.username}
                      onChange={handleTextChange('username')}
                    />
                  </Grid>
                </Grid>
                <Grid item container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="body1">Password</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Input Password"
                      type="password"
                      value={formState.password}
                      onChange={handleTextChange('password')}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Remember Me</Typography>
                </Grid>
                <Grid item m={1} />
                <Grid item sx={{ alignSelf: 'flex-end' }}>
                  <Button variant="contained" onClick={handleLogin}>
                    Login
                  </Button>
                </Grid>
                <Grid item sx={{ alignSelf: 'flex-end' }}>
                  <Typography variant="body1">Forget your password?</Typography>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </BoxContainer>
    </BoxContainer>
  );
};

export default LoginLayout;
