import './App.css';
import Login from './Login';
import AuthRoute from './AuthRoute';
import Home from "./Home";
import User from "./User/ManageUsers";
import Team from "./Team/ManageTeam";
import Role from "./Role/ManageRole";
import PageNotFound from "./PageNotFound";
import { Helmet } from 'react-helmet';
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
    <Router>
      <Helmet>
        <title></title>
        <body style="background-color:#f7f7f7;" />
      </Helmet>
      <Routes>
        <Route path="/" exact element={<Login setToken={setToken} />} />
        <Route path="/home" element={<AuthRoute> <Home /> </AuthRoute>} />
        <Route path="/users" element={<AuthRoute> <User /> </AuthRoute>} />
        <Route path="/teams" element={<AuthRoute> <Team /> </AuthRoute>} />
        <Route path="/roles" element={<AuthRoute> <Role /> </AuthRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
