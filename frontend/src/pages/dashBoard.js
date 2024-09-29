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

  const [successPopup, setSuccessPopup] = useState(false);
  const [failurePopup, setFailurePopUp] = useState(false);
  const [popUpText, setPopUpText] = useState("");
  const [transcript, setTranscript] = useState("eweewewe");

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

  const handleTranscript = (transcript) => {
    console.log("transcript: ", transcript);

    setTranscript(transcript);
  };

  const handleSuccess = () => {
    console.log("success...");

    setSuccessPopup(true);
    setTimeout(() => {
      setSuccessPopup(false);
    }, 3000);
  };
  const handleFailure = () => {
    console.log("failure...");

    setFailurePopUp(true);
    setTimeout(() => {
      setFailurePopUp(false);
    }, 3000);
  };
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
      <div className="z-50 absolute bottom-0 right-0 p-5">
        <VoiceRecorder
          size={30}
          padding={5}
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          inputMessage={handleTranscript}
        />
      </div>
      {successPopup && (
        <div
          className={`absolute bottom-10 text-center w-screen left-0 transition-all ${
            successPopup
              ? "opacity-100 transition-all"
              : "opacity-0 transition-all"
          }`}
          //   data-aos="fade-in"
        >
          <span className="bg-green-500 p-3 rounded-xl">
            Message Successfully saved...
          </span>
        </div>
      )}
      {failurePopup && (
        <div
          className={`absolute bottom-10 text-center w-screen left-0 transition-all ${
            failurePopup
              ? "opacity-100 transition-all"
              : "opacity-0 transition-all"
          }`}
          //   data-aos="fade-in"
        >
          <span className="bg-red-500 p-3 rounded-xl">
            Failed to save message...
          </span>
        </div>
      )}
      {transcript && (
        <div className="absolute right-0 bottom-5 w-screen flex justify-center items-center -z-10">
          <p className=" bg-black bg-opacity-40 text-white p-1 px-2  max-w-[70rem] rounded-lg">
            {transcript}
          </p>
        </div>
      )}
    </div>
  );
}
