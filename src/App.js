// import './App.css';
// import { Route, Router } from "react-router-dom/cjs/react-router-dom.min";
// import { Route, Router } from "react-router-dom";
import Home from "./Home";
import Loginid from "./Loginid";
// import PrivateRoute from "./PrivateRoute";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Loginid />} />
      <Route element={<ProtectedRoutes/>}>
      <Route path="/home" element={<Home />}  />
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
