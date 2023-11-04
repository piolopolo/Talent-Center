import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Grid, Toolbar, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import EditTalentAlert from 'components/GlobalAlert';

import NavbarAdmin from 'components/admin/NavbarAdmin';
import DrawerAdmin from 'components/admin/DrawerAdmin';
import FormEditTalent from 'components/admin/FormEditTalent';
import Footer from 'components/admin/Footer';

import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function EditTalent() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(true);
  const [editTalentSuccess, setEditTalentSuccess] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  const navigateToTalentList = () => {
    navigate('/admin/talent-list');
  };

  const handleEditTalentSuccess = () => {
    setEditTalentSuccess(true);
    setTimeout(() => {
      setEditTalentSuccess(false);
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
            height: 'fit-content',
            paddingBottom: '30px',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="none" sx={{ mt: 4, mb: 4 }}>
            {editTalentSuccess && (
              <EditTalentAlert open={editTalentSuccess} onClose={() => setEditTalentSuccess(false)} str="Approved successfully" severity="success" />
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
          <FormEditTalent />
          
        </Box>
        <Footer></Footer>
      </Box>

    </ThemeProvider>
  );
}
