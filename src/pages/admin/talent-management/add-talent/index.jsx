import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Material-UI imports
import { createTheme, ThemeProvider, Box, Container, Grid, Toolbar, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import CreateTalentAlert from 'components/GlobalAlert';

// Custom component imports
import NavbarAdmin from 'components/admin/NavbarAdmin';
import DrawerAdmin from 'components/admin/DrawerAdmin';
import FormAddTalent from 'components/admin/FormAddTalent';
import Footer from 'components/admin/Footer';

import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function TambahTalent() {
  const { t } = useTranslation();

  const [createTalentSuccess, setCreateTalentSuccess] = useState(false);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  const navigateToTalentList = () => {
    navigate('/admin/talent-list');
  };

  const handleCreateTalentSuccess = () => {
    setCreateTalentSuccess(true);
    setTimeout(() => {
      setCreateTalentSuccess(false);
    }, 3000); // Menutup alert setelah 3 detik
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
          {/* FORM */}
          <Container maxWidth="none" sx={{ mt: 4, mb: 4 }}>
            {createTalentSuccess && (
              <CreateTalentAlert
                open={createTalentSuccess}
                onClose={() => setCreateTalentSuccess(false)}
                str="Talent Data Added successfully"
                severity="success"
              />
            )}
            <Grid container>
              {/* Title */}
              <Grid item xs={12}>
                <Button variant="text" onClick={navigateToTalentList} startIcon={<ArrowBack style={{ color: '#3B4758' }}></ArrowBack>}>
                  <Typography style={{ color: '#3B4758', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '500', textTransform: 'none' }}>
                    {t('admin.addTalent.back')}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Container>
          <FormAddTalent onCreateTalentSuccess={handleCreateTalentSuccess}></FormAddTalent>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
