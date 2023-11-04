import React from 'react';
import { useTranslation } from 'react-i18next';
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
import { useNavigate, useLocation } from 'react-router-dom';

const listItemStyle = {
  fontFamily: 'Poppins',
  fontWeight: '500',
  alignItems: 'center',
  padding: '12px',
  marginBottom: '15px',
};

const menuItems = [
  { icon: DashboardIcon, label: 'admin.sidebar.item1', route: 'dashboard' },
  { icon: PeopleAltIcon, label: 'admin.sidebar.item2', tooltip: 'Daftar Talent', route: 'talent-list' },
  { icon: BusinessCenterIcon, label: 'admin.sidebar.item3', tooltip: 'Daftar Client', route: 'client-list' },
  { icon: AssignmentIcon, label: 'admin.sidebar.item4', tooltip: 'Daftar Persetujuan Talent', route: 'talent-approval' },
  { icon: AccountCircleIcon, label: 'admin.sidebar.item5', tooltip: 'Kelola User', route: 'user-management' },
];

const iconStyle = {
  alignItems: 'center',
  display: 'flex',
};

export const DrawerChild = ({ open }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
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
          src={`${process.env.PUBLIC_URL}/resource/image/logo79sidebar.svg`}
        />
      </div>

      {menuItems.map((item, index) => {
        // Cek apakah rute saat ini cocok dengan rute item
        const isActive = location.pathname.endsWith(`/${item.route}`);

        return (
          <Box sx={{}} key={index}>
            <ListItemButton
              onClick={() => navigate('../' + item.route)}
              style={{
                ...listItemStyle,
                color: isActive ? 'white' : '#586A84',
                backgroundColor: isActive ? '#0078D7' : 'transparent',
                borderRadius: isActive ? '6px' : '0',
              }}
            >
              {open ? (
                <ListItemIcon style={{ ...iconStyle, color: isActive ? 'white' : '#586A84' }}>
                  <item.icon />
                </ListItemIcon>
              ) : (
                <Tooltip title={item.tooltip || item.label} placement="right">
                  <ListItemIcon style={{ ...iconStyle, color: isActive ? 'white' : '#586A84' }}>
                    <item.icon />
                  </ListItemIcon>
                </Tooltip>
              )}
              {open && (
                <Typography variant="body2" style={{ whiteSpace: 'normal', fontFamily: 'Poppins' }}>
                  {t(item.label)}
                </Typography>
              )}
            </ListItemButton>
          </Box>
        );
      })}
    </React.Fragment>
  );
};
