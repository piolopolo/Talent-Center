import { useMemo } from 'react';

import { Button, Card, Container, Grid, TextField, Typography } from '@mui/material';

import BoxContainer from '@astarx-studio/mui/components/BoxContainer';
import { useTheme } from '@astarx-studio/react-core/theme';
import SignInLayout from 'components/SignInLayout';
import RegisterLayout from 'components/RegisterLayout';

const GridCard = ({ darkMode, children }) => {
  return (
    <Grid item xs>
      <Card
        sx={{
          background: darkMode ? 'linear-gradient(97.51deg, #4345AA 0%, #10126A 100%)' : 'linear-gradient(97.51deg, #ECEDF5 0%, #B8BEF0 100%)',
          p: 3,
        }}
      >
        {children}
      </Card>
    </Grid>
  );
};

const Customer = () => {
  const { meta } = useTheme();

  const darkMode = useMemo(() => meta.type === 'DARK', [meta]);

  return (
    <BoxContainer
      fit="stretch-to-view"
      sx={{
        background: `url(${process.env.PUBLIC_URL}/resource/image/bg-cust-${darkMode ? 'dark' : 'light'}.svg)`,
        backgroundSize: 'cover',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

      

      <Container maxWidth="md">
        <Grid container direction="column" alignItems="stretch" justifyContent="center" spacing={3}>
          <GridCard darkMode={darkMode}>
            <Grid container direction="column" alignItems="stretch" justifyContent="flex-start" spacing={2}>
              
              <Grid item xs>
                
                <RegisterLayout />
              </Grid>

              <Grid item xs>
                <SignInLayout />
               
              </Grid>
              
              <Grid item>
                <Typography variant="h5">Ambil Antrian</Typography>
              </Grid>
              <Grid item>
                <TextField variant="outlined" fullWidth placeholder="Nomor Polisi" />
              </Grid>
              <Grid item>
                <TextField variant="outlined" fullWidth placeholder="Nama" />
              </Grid>
              <Grid item container direction="row" alignItems="center" justifyContent="flex-end">
                <Button variant="outlined">Ambil Nomor Antrian</Button>
              </Grid>
            </Grid>
          </GridCard>
          <GridCard darkMode={darkMode}>
            <Grid container direction="column" alignItems="center" justifyContent="flex-start" spacing={2}>
              <Grid item>
                <Typography variant="h5">Antrian Reguler</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h1">- - - -</Typography>
              </Grid>
              <Grid item>
                <Button variant="outlined">Simpan {'&'} Cetak Nomor Antrian</Button>
              </Grid>
            </Grid>
          </GridCard>
        </Grid>
      </Container>
    </BoxContainer>
  );
};

export default Customer;
