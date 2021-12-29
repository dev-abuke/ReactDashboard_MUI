import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavBar/DashboardTopNavbar'; 
import ResponsiveDrawer from "./drawer";
import AuthRoute from './AuthRoute';
// import DashboardSidebar from './DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 52,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 50,
    paddingLeft: theme.spacing(15),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <AuthRoute>
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <ResponsiveDrawer />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
    </AuthRoute>
  );
}
