import './App.css';
import Login from './Login';
import Dashboard from "./Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import useToken from "./useToken";

function App() {

  const {token, setToken} = useToken();

  console.log("App tok ", useToken())

  if(!token) {
    console.log("no token")
    return <Login setToken={setToken} />
  }

  console.log("token available")
  return (
  <div>
  <Router>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  </div>
  );
}

export default App;
