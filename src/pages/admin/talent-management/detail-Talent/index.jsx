import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Grid, Toolbar, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import NavbarAdmin from 'components/admin/NavbarAdmin';
import DrawerAdmin from 'components/admin/DrawerAdmin';
import FormEditTalent from 'components/admin/FormEditTalent';
import Footer from 'components/admin/Footer';
import CardTalent from 'components/admin/CardTalent';

import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function DetailTalent() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  const navigateToTalentList = () => {
    navigate('/admin/talent-list');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <DrawerAdmin open={open} toggleDrawer={toggleDrawer} />

        <NavbarAdmin />
        <Box
          component="main"
          sx={{
            backgroundColor: '#F1F6FF',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="none">
            <Grid container sx={{ my: '32px' }}>
              {/* Title */}
              <Grid item md={12}>
                <Button variant="text" onClick={navigateToTalentList} startIcon={<ArrowBack style={{ color: '#3B4758' }}></ArrowBack>}>
                  <Typography style={{ color: '#3B4758', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '500', textTransform: 'none' }}>
                    {t('admin.addTalent.back')}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <CardTalent />
          </Container>
          <Toolbar />  
        </Box>
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
