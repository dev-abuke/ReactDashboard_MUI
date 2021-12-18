import './App.css';
import Login from './Login';
import AuthRoute from './AuthRoute';
import Home from "./Home";
import User from "./Users/ManageUsers";
import PageNotFound from "./PageNotFound";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useToken from "./useToken";


function App() {
  //console.log("token available")
  let auth = false

  const { token, setToken } = useToken();

  if (token) {
    auth = true
  }

  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Login setToken={setToken}/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<User />} />
        
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
