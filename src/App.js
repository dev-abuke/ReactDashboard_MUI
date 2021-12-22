import './App.css';
import Login from './Login';
import AuthRoute from './AuthRoute';
import Home from "./Home";
import User from "./Users/ManageUsers";
import PageNotFound from "./PageNotFound";
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
      <Routes>
        <Route path="/" exact element={<Login setToken={setToken} />} />
        <Route path="/home" element={<AuthRoute> <Home /> </AuthRoute>} />
        <Route path="/users" element={<AuthRoute> <User /> </AuthRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
