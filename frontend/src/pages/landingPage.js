import React from "react";
import NavBar from "../components/navBar";
import baymaxBg from "../assets/baymaxBg.jpg";

export default function LandingPage() {
  return (
    <div
      className="h-screen w-screen "
      style={{
        backgroundImage: `url(${baymaxBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <NavBar />
      <div className="flex  p-20">
        <div className="flex flex-col gap- text-white font-mono p-10 rounded-2xl bg-black bg-opacity-60">
          <span className="font-bold text-[40px] font-mono">Hey, this is BayMax...</span>
          <span className="text-[25px]">Your Personal AI Assistant</span>
          <p>Make yourself comfortable by signning in and using our service.</p>
        </div>
      </div>
    </div>
  );
}
