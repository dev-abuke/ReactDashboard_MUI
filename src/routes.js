import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './DashboardLayout';
// import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// //
// import Register from './pages/Register';
// import DashboardApp from './pages/DashboardApp';
// import Products from './pages/Products';
// import Blog from './pages/Blog';
// import NotFound from './pages/Page404';

////..//
import Login from './Login';
import AuthRoute from './AuthRoute';
import Home from "./Home";
import User from "./User/ManageUsers";
import Team from "./Team/ManageTeam";
import Role from "./Role/ManageRole";
import PageNotFound from "./PageNotFound";
import useToken from "./useToken";

// ----------------------------------------------------------------------

export default function Router() {
  
  const { token, setToken } = useToken();

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <Home /> },
        { path: 'users', element: <User /> },
        { path: 'teams', element: <Team /> },
        { path: 'roles', element: <Role /> }
      ]
    },
    {
      path: '/',
      element: <Login setToken={setToken}/>,
    },
    { path: '*', element: <PageNotFound /> }
  ]);
}
