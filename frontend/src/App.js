import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import { useEffect, useState } from "react";

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
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
