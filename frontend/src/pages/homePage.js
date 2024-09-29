import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { Route, Routes } from "react-router-dom";

import DashBoard from "./dashBoard";
import Uploads from "./uploads";
import ChatWindow from "./chatWindow";
import VoiceBot from "../components/voiceBot";
import Report from "./report";

export default function HomePage() {
  useEffect(() => {
    console.log("Homepage");
  }, []);

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
    >
      {/* <div className="w-80"> */}
        <SideBar />
      {/* </div> */}
      <div className="h-full w-4/5">
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/uploads" element={<Uploads />} />
          <Route path="/chatBot" element={<ChatWindow />} />
          <Route path="/VoiceBot" element={<VoiceBot />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </div>
  );
}
