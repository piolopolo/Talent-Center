import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function GlobalAlert({ open, onClose, str, severity }) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert
        open={open}
        onClose={onClose}
        severity={severity}
        style={{
          backgroundColor: severity === 'success' ? '#A4FFBD' : '#FEE4E2',
          borderRadius: 20,
          textAlign: 'center',
          width: 'auto',
          margin: '0 auto',
        }}
      >
        <span style={{ color: severity === 'success' ? '#30A952' : '#CF1D1D', fontWeight: '600' }}>{str}</span>
      </Alert>
    </Snackbar>
  );
}

export default GlobalAlert;
