import { Navigate, Outlet } from 'react-router-dom';
import 'i18n';
import { ThemeProvider } from '@mui/material';

import { SecurableRoute } from '@astarx-studio/react-core/router';

import LoginLayout from 'layouts/LoginLayout';

import { lazy, Suspense } from 'react';

import Main from './main';
import Respon from './respon';
import Home from './home';
import MyRequest from './my-request';
import MyWishlist from './my-wishlist';

import TalentApproval from './admin/talent-approval';
import TalentList from './admin/talent-management/talent-list';
import TambahTalent from './admin/talent-management/add-talent';
import EditTalent from './admin/talent-management/edit-talent';
import DetailTalent from './admin/talent-management/detail-Talent';

import Loading from 'components/Loading';

import { LightTheme } from 'resource/themes';

const Detail = lazy(() => import('./detail'));

const routes: SecurableRoute[] = [
  {
    index: true,
    element: <Navigate to="/home" />,
  },
  {
    path: 'home',
    element: (
      <ThemeProvider theme={LightTheme}>
        <Home />
      </ThemeProvider>)
  },
  {
    path: 'main',
    element: (
      <ThemeProvider theme={LightTheme}>
        <Main />
      </ThemeProvider>)
  },
  {
    path: 'respon',
    element: (
      <ThemeProvider theme={LightTheme}>
        <Respon />,
      </ThemeProvider>
    )
  },
  {
    path: 'detail/:id',
    element:
      <Suspense fallback={<Loading />}>
        <Detail />,
      </Suspense>,
  },
  {
    path: 'wishlist',
    element:
      <ThemeProvider theme={LightTheme}>
        <MyWishlist />,
      </ThemeProvider>,
  },
  {
    path: 'my-request',
    element: (
      <ThemeProvider theme={LightTheme}>
        <MyRequest />,
      </ThemeProvider>
    )
  },
  {
    path: 'admin',
    element: (
      <ThemeProvider theme={LightTheme}>
        <Outlet />
      </ThemeProvider>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="login" />,
      },
      {
        path: 'login',
        element: <LoginLayout />,
      },
      {
        path: 'talent-approval',
        element: <TalentApproval />,
      },
      {
        path: 'detail-talent/',
        element: <DetailTalent />,
      },
      {
        path: 'talent-list',
        element: <TalentList />,
      },
      {
        path: 'tambah-talent',
        element: <TambahTalent />,
      },
      {
        path: 'edit-talent/:id',
        element: <EditTalent />,
      },
    ],
  },
];

export default routes;
