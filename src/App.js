import './App.css';
import AuthRoute from './AuthRoute';
import Home from "./Pages/Home/Home";
import Login from './Pages/Login/Login';
import User from "./Pages/User/ManageUsers";
import Team from "./Pages/Team/ManageTeam";
import Role from "./Pages/Role/ManageRole";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PageNotFound from "./Components/NotFound/PageNotFound";
import ThemeConfig from './theme';
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useToken from "./useToken";

function App() {

  const { setToken } = useToken();

  return (
    <ThemeConfig>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />

        <Route path="/home" element={<AuthRoute> <Home /> </AuthRoute>} >
          <Route path="" element={<Navigate to="/home/dashboard" replace />} />
          <Route path="users" element={<User />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="teams" element={<Team />} />
          <Route path="roles" element={<Role />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeConfig>
  );
}

export default App;
