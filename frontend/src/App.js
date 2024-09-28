import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import HomePage from "./pages/homePage";
import LandingPage from "./pages/landingPage";

function App() {
  const [userKey, setUserKey] = useState(localStorage.getItem("key") || null);

  useEffect(() => {
    if (userKey) {
      console.log("user found...");
    } else {
      console.log("user not found");
    }
  }, []);

  return (
    // <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/homePage/*" element={<HomePage />} />

      </Routes>
    // </Router>
  );
}

export default App;
