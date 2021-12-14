import './App.css';
import Login from './Login';
import Home from "./Home";
import User from "./Users/ManageUsers";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import useToken from "./useToken";

function App() {

  const {token, setToken} = useToken();

  if(!token) {
    console.log("no token")
    return <Login setToken={setToken} />
  }

  console.log("token available")
  return (
  //<Dashboard />
  
  <Router>
    <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/users" element={<User token={token}/>} />
    </Routes>
  </Router>
  
  );
}

export default App;
