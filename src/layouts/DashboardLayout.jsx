import { Navigate, Outlet } from 'react-router-dom';

import { Avatar, Card, Grid, IconButton } from '@mui/material';
import { Dashboard, Group, Home, Settings } from '@mui/icons-material';

import BoxContainer from '@astarx-studio/mui/components/BoxContainer';
import GenericLayout, { Bar, Content } from '@astarx-studio/mui/layouts/GenericLayout';
import { useIdentity } from '@astarx-studio/react-core/auth';

const DashboardLayout = () => {
  const { isLoggedIn } = useIdentity();

  if (!isLoggedIn) return <Navigate to="/admin/login" />;
  return (
    <BoxContainer fit="stretch-to-view">
      <GenericLayout barPosition="left">
        <Bar component={Card} sx={(theme) => ({ width: 80, borderRadius: 0, pt: `calc(60px + ${theme.spacing(2)})`, pb: 2 })}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            spacing={1}
            sx={(theme) => ({ height: `calc(100% + ${theme.spacing(1)})` })}
          >
            {[
              {
                icon: Home,
              },
              {
                icon: Dashboard,
              },
              {
                icon: Group,
              },
            ].map(({ icon: Icon }, i) => (
              <Grid key={i} item>
                <IconButton sx={{ height: 48, width: 48, borderRadius: 2 }}>
                  <Icon />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Bar>
        <GenericLayout barPosition="top">
          <Bar component={Card} sx={{ height: 60, borderRadius: 0, pr: 5, pl: 5 }}>
            <Grid
              container
              direction="row-reverse"
              alignItems="center"
              justifyContent="flex-start"
              spacing={1}
              sx={(theme) => ({ height: `calc(100% + ${theme.spacing(1)})` })}
            >
              <Grid item>
                <Avatar />
              </Grid>
              <Grid item ml={1} mr={1} />
              {[
                {
                  icon: Settings,
                },
              ].map(({ icon: Icon }, i) => (
                <Grid key={i} item>
                  <IconButton sx={{ height: 48, width: 48, borderRadius: 2 }}>
                    <Icon />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Bar>
          <Content sx={{ bgcolor: '#F5F5FF', p: 3 }}>
            <Outlet />
          </Content>
        </GenericLayout>
      </GenericLayout>
    </BoxContainer>
  );
};

export default DashboardLayout;
