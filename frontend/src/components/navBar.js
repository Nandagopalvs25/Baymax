import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-5 w-screen bg-black bg-opacity-20">
      <div>
        <span
          className="text-[40px] font-bold font-mono border-2 rounded-2xl p-3 text-center bg-red-400 cursor-pointer"
          onClick={() => navigate("/homepage")}
        >
          Baymax
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="p-2 px-4 rounded-lg bg-gradient-to-r from-[#ba4848cf] to-[#a9e090e4] border"
          onClick={() => navigate("login")}
        >
          Login
        </button>
        <button className="p-2 px-4 rounded-lg bg-gradient-to-r from-[#a9e090e4] to-[#ba4848cf] border"
          onClick={() => navigate("signup")}
          >
          Sign Up
        </button>
      </div>
    </div>
  );
}
