import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar as MuiAppBar, IconButton, Badge, Avatar } from '@mui/material';
import { Toolbar, Stack } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import ComboBoxLang from '../../components/admin/ComboBoxLang';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import i18n from 'i18n';

export default function AppHeader({ open, drawerWidth }) {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const [lang, setLang] = useState(i18n.language);

  // Fungsi untuk mengubah bahasa aplikasi saat pengguna memilih bahasa dari ComboBoxLang
  const handleLanguageChange = (selectedLang) => {
    i18n.changeLanguage(selectedLang);
  };

  // Effect untuk memantau perubahan bahasa dalam 'i18n'
  useEffect(() => {
    const currentLang = i18n.language;
    // Set nilai lang dalam state ComboBoxLang sesuai dengan bahasa yang sedang aktif
    setLang(currentLang);
  }, []);

  return (
    <AppBar position="absolute" open={open} style={{ backgroundColor: 'white', boxShadow: 'none', color: 'black' }}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
          display: 'flex-end', // Set to flex-end to align items to the right
          alignItems: 'center',
        }}
      >
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ marginLeft: 'auto' }}>
          <ComboBoxLang value={lang} onChange={handleLanguageChange} style={{ marginRight: 20 }}></ComboBoxLang>
          <IconButton color="inherit" style={{ marginRight: 20 }}>
            <Badge overlap="circular" badgeContent=" " color="secondary" variant="dot">
              <NotificationsIcon style={{ color: '#586A84' }} />
            </Badge>
          </IconButton>

          <Avatar
            alt="Cindy Baker"
            style={{ width: 40, height: 40, borderRadius: 200 }}
            src="https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk0OTczNTgyNDA3NzcxNjcy/kim-kardashian-net-worth-kardashian-family-net-worth.jpg"
          />
          <KeyboardArrowDownIcon />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
