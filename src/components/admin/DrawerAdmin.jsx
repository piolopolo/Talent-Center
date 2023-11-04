import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { Drawer as MuiDrawer, List, Toolbar, ListItemButton, ListItemIcon, Typography, IconButton } from '@mui/material';
import { DrawerChild } from './DrawerChild';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const drawerWidth = 240;

const listItemStyle = {
  color: '#586A84',
  fontFamily: 'Poppins',
  fontSize: '12px',
};

const circleButtonStyle = {
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: '#2C8AD3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
};

const collapseIconStyle = {
  width: 16,
  height: 16,
  position: 'absolute',
};

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function AppDrawer({ open, toggleDrawer }) {
  const { t } = useTranslation();

  return (
    <Drawer variant="permanent" open={open}>
      <List
        component="nav"
        style={{
          marginLeft: '10px',
          marginRight: '10px',
        }}
      >
        {DrawerChild({ open })}
      </List>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: [1],
        }}
      >
        <ListItemButton
          onClick={toggleDrawer}
          style={{
            alignItems: 'center',
            justifyContent: open ? 'center' : 'flex-start', // Adjusted styling
          }}
        >
          <ListItemIcon style={listItemStyle}>
            <IconButton style={circleButtonStyle}>
              {open ? <ArrowBackIosNewRoundedIcon style={collapseIconStyle} /> : <ArrowForwardIosRoundedIcon style={collapseIconStyle} />}
            </IconButton>
          </ListItemIcon>

          {open && (
            <div>
              <Typography variant="body1" style={listItemStyle}>
              {t('admin.sidebar.collapse')}
              </Typography>
            </div>
          )}
        </ListItemButton>
      </Toolbar>
    </Drawer>
  );
}
