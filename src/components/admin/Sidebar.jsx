import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Tooltip from '@mui/material/Tooltip';
import {
  DashboardRounded as DashboardIcon,
  PeopleAltRounded as PeopleAltIcon,
  BusinessCenterRounded as BusinessCenterIcon,
  AssignmentRounded as AssignmentIcon,
  AccountCircleRounded as AccountCircleIcon,
} from '@mui/icons-material';

const listItemStyle = {
  fontFamily: 'Poppins',
  fontWeight: '500',
  alignItems: 'center',
  padding: '15px 10px 15px 0px',
  marginBottom: '15px',
};

const menuItems = [
  { icon: DashboardIcon, label: 'Dashboard' },
  { icon: PeopleAltIcon, label: 'Daftar Talent', tooltip: 'Daftar Talent', active: true },
  { icon: BusinessCenterIcon, label: 'Daftar Client', tooltip: 'Daftar Client' },
  { icon: AssignmentIcon, label: 'Daftar Persetujuan Talent', tooltip: 'Daftar Persetujuan Talent'},
  { icon: AccountCircleIcon, label: 'Kelola User', tooltip: 'Kelola User' },
];

const iconStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex', // Added display: 'flex'
};

export const mainListItems = ({ open }) => (
  <React.Fragment>
    {/* Logo */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 24,
      }}
    >
      <img
        style={{ width: '80%', maxWidth: '100%', maxHeight: '100%' }}
        alt="company-logo"
        src= {`${process.env.PUBLIC_URL}/resource/image/logo79sidebar.svg`}
      />
    </div>

    {menuItems.map((item, index) => (
      <Box sx={{
        // padding: '10px',
      }}>
        <ListItemButton
          key={index}
          style={{
            ...listItemStyle,
            color: item.active ? 'white' : '#586A84',
            backgroundColor: item.active ? '#0078D7' : 'transparent',
            borderRadius: item.active ? '6px' : '0',
          }}
        >
          {open ? (
            <ListItemIcon style={{ ...iconStyle, color: item.active ? 'white' : '#586A84' }}>
              <item.icon />
            </ListItemIcon>
          ) : (
            <Tooltip title={item.tooltip || item.label} placement="right">
              <ListItemIcon style={{ ...iconStyle, color: item.active ? 'white' : '#586A84' }}>
                <item.icon />
              </ListItemIcon>
            </Tooltip>
          )}
          {open && (
            <Typography variant="body1" style={{ whiteSpace: 'normal', fontFamily: 'Poppins' }}>
              {item.label}
            </Typography>
          )}
        </ListItemButton>
      </Box>
    ))}
  </React.Fragment>
);
