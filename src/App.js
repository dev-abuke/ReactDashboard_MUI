import './App.css';
import Login from './Login';
import AuthRoute from './AuthRoute';
import Home from "./Home";
import User from "./User/ManageUsers";
import Team from "./Team/ManageTeam";
import Role from "./Role/ManageRole";
import PageNotFound from "./PageNotFound";
import { Helmet } from 'react-helmet';
import ThemeConfig from './theme';
import Dashboard from "./DashboardContainer.js";
import Routers from './routes';
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Navigate,
} from "react-router-dom";
import useToken from "./useToken";

function App() {
  //console.log("token available")

  const { token, setToken } = useToken();

  return (
    <ThemeConfig>
      <Helmet>
        <title></title>
        <body style="background-color:#f7f7f7;" />
      </Helmet>
      <Routes>
        <Route path="/" exact element={<Login setToken={setToken} />} />
        <Route path="/home" element={<AuthRoute> <Home /> </AuthRoute>} >
          <Route path="" element={<Navigate to="/home/dashboard" replace />} />
          <Route path="users" element={<AuthRoute> <User /> </AuthRoute>} />
          <Route path="dashboard" element={<AuthRoute> <Dashboard /> </AuthRoute>} />
          <Route path="teams" element={<AuthRoute> <Team Hello={"Hello from App"} /> </AuthRoute>} />
          <Route path="roles" element={<AuthRoute> <Role /> </AuthRoute>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeConfig>
  );
}

export default App;
