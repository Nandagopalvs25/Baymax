import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa6";
import { BsFillStopCircleFill } from "react-icons/bs";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);

  const initializeRecognition = () => {
    const recognitionInstance = new window.webkitSpeechRecognition(); // Use 'SpeechRecognition' for non-Chrome browsers
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onresult = (event) => {
      const transcriptText = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setTranscript(transcriptText);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionInstance.onend = () => {
      setIsRecording(false);
      // Call API to upload the transcript once the recording stops
      if (transcript) {
        uploadTranscript(transcript);
      }
    };

    setRecognition(recognitionInstance);
  };

  const toggleRecording = () => {
    if (isRecording) {
      console.log("Recording stopped...");
      recognition.stop();
      if (transcript) {
        uploadTranscript(transcript);
      }
      setIsRecording(false);
    } else {
      console.log("Recording started...");
      recognition.start();
      setIsRecording(true);
    }
  };

  const uploadTranscript = async (text) => {
    try {
      console.log("Uploading transcript to the backend...");

      const response = await fetch("https://your-backend-api.com/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript: text }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Transcript uploaded successfully:", data);
      } else {
        console.error("Error uploading transcript:", data);
      }
    } catch (error) {
      console.error("Error uploading transcript:", error);
    }
  };

  React.useEffect(() => {
    if (!recognition) {
      initializeRecognition();
    }
  }, [recognition]);

  return (
    <div className="p-5 relative">
      <button
        onClick={toggleRecording}
        className="flex items-center justify-center bg-green-500 p-5 rounded-full cursor-pointer"
      >
        {isRecording ? (
          <BsFillStopCircleFill size={30} />
        ) : (
          <FaMicrophone size={30} />
        )}
      </button>
      {transcript && (
        <div className="absolute right-0 bottom-5 w-screen flex justify-center items-center -z-10">
          <p className=" bg-black bg-opacity-40 text-white p-1 px-2  max-w-[70rem] rounded-lg">
            {transcript}
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
