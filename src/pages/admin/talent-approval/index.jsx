import * as React from 'react';
import { useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Grid, Toolbar, Typography, Alert } from '@mui/material';

import ApprovalAlert from 'components/GlobalAlert';

import AutocompleteTalentApproval from 'components/admin/AutocompleteTalentApproval';
import ComboBoxCustom from 'components/admin/ComboBoxCustom';
import NavbarAdmin from 'components/admin/NavbarAdmin';
import DrawerAdmin from 'components/admin/DrawerAdmin';
import Footer from 'components/admin/Footer';

const TalentApprovalTable = React.lazy(() => import('components/admin/TalentApprovalTable'));

const defaultTheme = createTheme();

export default function TalentApproval() {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(true);
  const [approvalSuccess, setApprovalSuccess] = useState(false);

  const [sortBy, setSortBy] = useState('newest');
  const [filterStatusApproval, setFilterStatusApproval] = useState('all');
  const [clientNameSearched, setClientNameSearched] = useState('');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleApprovalSuccess = () => {
    setApprovalSuccess(true);
    setTimeout(() => {
      setApprovalSuccess(false);
    }, 3000); // Menutup alert setelah 3 detik
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy); // Fungsi untuk mengubah pengurutan
  };

  const handleFilterStatusApprovalChange = (newStatus) => {
    setFilterStatusApproval(newStatus); // Fungsi untuk mengubah pengurutan
  };

  const handleClientNameSearch = (newName) => {
    setClientNameSearched(newName); // Fungsi untuk mengubah pengurutan
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
            {approvalSuccess && <ApprovalAlert open={approvalSuccess} onClose={() => setApprovalSuccess(false)} str="Approved successfully" severity="success"/>}
            <Grid container spacing={3}>
              {/* Title */}
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  align="left"
                  style={{ color: '#3B4758', fontSize: 22, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word' }}
                >
                  {t('admin.talentApproval.header')}
                </Typography>
              </Grid>

              {/* Autocomplete Search By Nama Instansi */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <AutocompleteTalentApproval key="autocomplete-talent-approval" onSearch={handleClientNameSearch} style={{ width: '100%' }} />{' '}
              </Grid>

              {/* Sort By Time Request */}
              <Grid item xs={12} sm={6} md={2} lg={2} style={{ marginRight: '20px' }}>
                <ComboBoxCustom selected={sortBy} onSelectedChange={handleSortChange} options={{ newest: 'Newest', oldest: 'Oldest' }} />
              </Grid>

              {/* Filter By Approval Status */}
              <Grid item xs={12} sm={6} md={2} lg={2}>
                <ComboBoxCustom
                  selected={filterStatusApproval}
                  onSelectedChange={handleFilterStatusApprovalChange}
                  options={{ onprogress: 'On Progress', approved: 'Approved', rejected: 'Rejected', all: 'All' }}
                />
              </Grid>

              <Grid item xs={12}>
                <Suspense fallback={<div>Loading...</div>}>
                  <TalentApprovalTable
                    sortBy={sortBy}
                    statusApprovalFilter={filterStatusApproval}
                    clientNameSearched={clientNameSearched}
                    onApprovalSuccess={handleApprovalSuccess}
                  />
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