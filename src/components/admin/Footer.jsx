import AppBar from '@mui/material/AppBar';
import {Typography } from '@mui/material';


export default function Footer() {
  return (
    <AppBar sx={{ top: 'auto', bottom: 0, height: 40 }} style={{ backgroundColor: 'white', boxShadow: 'none' }}>
      <Typography
        variant="caption"
        align="center"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#586A84',
          fontFamily: 'Inter',
          fontWeight: '500',
          height: '100%',
        }}
      >
        {' © '}
        2022 - Talent Management 79
      </Typography>
    </AppBar>
  );
}
