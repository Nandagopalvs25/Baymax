import React, { useState, useEffect } from "react";
import baymaxBg from "../assets/baymaxBg.jpg";

import VoiceRecorder from "../components/voiceBot";

export default function DashBoard() {
  const [displayText, setDisplayText] = useState(["", ""]);
  const textLines = [
    "Heey Amit...",
    "hhow r u doing today? Seems like a little tough day!",
    "No worries, here is what you can do to make it better...",
  ];

  useEffect(() => {
    let currentLine = 0;
    let currentIndex = 0;

    const typingEffect = setInterval(() => {
      if (currentLine < textLines.length) {
        const currentText = textLines[currentLine];

        // Add characters to the current line until finished
        if (currentIndex < currentText.length - 1) {
          setDisplayText((prev) => {
            const updatedText = [...prev];
            updatedText[currentLine] =
              updatedText[currentLine] + currentText[currentIndex];
            return updatedText;
          });
          currentIndex++;
        } else {
          // Move to the next line
          currentLine++;
          currentIndex = 0;
        }
      } else {
        clearInterval(typingEffect); // Stop when all lines are done
      }
    }, 50); // Adjust the typing speed here

    return () => clearInterval(typingEffect);
  }, []);

  return (
    <div
      className="w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${baymaxBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center h-full w-full p-5 sm:p-10">
        <div className="text-white p-10 rounded-2xl bg-black bg-opacity-50">
          {/* Render the first line */}
          <span className="text-[40px] font-bold font-serif leading-6">
            {displayText[0] || ""}
          </span>
          <br />
          {/* Render the second line */}
          <p className="text-[16px] sm:text-[20px] font-semibold">
            {displayText[1] || ""}
          </p>
        </div>
      </div>
      <div className="z-50 absolute bottom-0 right-0">
        <VoiceRecorder />
      </div>
    </div>
  );
}
