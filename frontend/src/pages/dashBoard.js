import React from "react";
import baymaxBg from "../assets/baymaxBg.jpg";

export default function dashBoard() {
  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{ backgroundImage: { baymaxBg } }}
    >
      {/* <div>Helooo</div> */}
      <img className=" top-0 w-full h-full -z-10" src={baymaxBg}></img>
    </div>
  );
}
