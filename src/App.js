import './App.css';
import Login from './Login';
import Home from "./Home";
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
  <div>
  <Router>
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>
  </div>
  );
}

export default App;
