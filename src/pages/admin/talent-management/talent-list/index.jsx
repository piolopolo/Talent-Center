import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Grid, Toolbar, Typography, Button } from '@mui/material';
import { Suspense } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import AutocompleteTalentList from 'components/admin/AutocompleteTalentList';
import ComboBoxCustom from 'components/admin/ComboBoxCustom';
import NavbarAdmin from 'components/admin/NavbarAdmin';
import DrawerAdmin from 'components/admin/DrawerAdmin';
import Footer from 'components/admin/Footer';

const TalentListTable = React.lazy(() => import('components/admin/TalentListTable'));

const defaultTheme = createTheme();

export default function TalentApproval() {
  const { t } = useTranslation();

  const [sortBy, setSortBy] = useState('created_time');
  const [talentNameSearched, setTalentNameSearched] = useState('');

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy); // Fungsi untuk mengubah pengurutan
  };

  const handleTalentNameSearch = (newName) => {
    setTalentNameSearched(newName); // Fungsi untuk mengubah pengurutan
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

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Row 1 : Title */}
            <Grid container spacing={3}>
              {/* Title */}
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  align="left"
                  style={{
                    color: '#3B4758',
                    fontSize: 22,
                    fontFamily: 'Poppins',
                    fontWeight: '700',
                    wordWrap: 'break-word',
                  }}
                >
                  {t('admin.talentList.header')}
                </Typography>
              </Grid>

              {/* Row 2: Autocomplete, ComboBox, and Add Talent Button */}
              <Grid item xs={12} container alignItems="center">
                {/* Autocomplete Search */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <AutocompleteTalentList key="autocomplete-talent-approval" onSearch={handleTalentNameSearch} style={{ width: '80%' }} />{' '}
                </Grid>

                {/* Sort By Talent Experience */}
                <Grid item xs={12} sm={6} md={2} lg={2}>
                  <ComboBoxCustom
                    selected={sortBy}
                    onSelectedChange={handleSortChange}
                    options={{ experience: 'Years of Experience', created_time: 'Created Time' }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={2} lg={2}></Grid>

                {/* Add Talent Button */}
                <Grid item xs={12} sm={6} md={4} lg={4} container justifyContent="flex-end">
                  <Button
                    onClick={() => navigate('/admin/tambah-talent')}
                    variant="contained"
                    style={{
                      backgroundColor: '#2C8AD3',
                      minWidth: 'auto', // Menyesuaikan lebar dengan teks
                      textTransform: 'none', // Agar teks tidak ditulis dengan huruf besar semua
                      height: '55px',
                    }}
                    startIcon={<AddIcon />}
                  >
                    {t('admin.talentList.addTable')}
                  </Button>
                </Grid>
              </Grid>

              {/* Row 3: Talent List Table */}
              <Grid item xs={12}>
                <Suspense fallback={<div>Loading...</div>}>
                  <TalentListTable sortBy={sortBy} talentNameSearched={talentNameSearched} />
                </Suspense>
              </Grid>

              <Grid item xs={12}></Grid>
            </Grid>
          </Container>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
