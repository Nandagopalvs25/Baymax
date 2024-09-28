import React from "react";
import NavBar from "../components/navBar";
import baymaxBg from "../assets/baymaxBg.jpg";

export default function LandingPage() {
  return (
    <div
      className="h-screen w-screen"
      style={{ backgroundImage: { baymaxBg } }}
    >
      <NavBar />
    </div>
  );
}
