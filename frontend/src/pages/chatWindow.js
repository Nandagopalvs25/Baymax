import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { json } from "react-router-dom";
// import './App.css';  // Add any custom styling you may need

const ChatWindow = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const key = localStorage.getItem("key");

  const sendMessageToApi = async (date, message) => {
    if (!key) {
      alert("Key not found...");
      //   setIsLoading(false);
      return;
    }
    const data = {
      msg: inputMessage,
      date: selectedDate
        ? `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${selectedDate
            .getDate()
            .toString()
            .padStart(2, "0")}`
        : "",
    };
    try {
      const response = await axios.post("http://127.0.0.1:8000/aichat/", data, {
        headers: {
          Authorization: `token ${key}`,
        },
      });

      console.log("response: ", response);

      if (response?.data) {
        return response?.data; 
      } else {
        console.error("Invalid response data:", response.data);
        // alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.log("Error occurred: ", error);
      alert("Invalid credentials. Try again later.");
    } finally {
      //   setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to the chat
    const newMessage = {
      type: "user",
      content: inputMessage,
      date: selectedDate,
    };
    setMessages([...messages, newMessage]);

    // Fetch response from API
    const responseMessage = await sendMessageToApi(selectedDate, inputMessage);

    // Add API response to the chat
    const apiMessage = {
      type: "bot",
      content: responseMessage,
      date: selectedDate,
    };
    setMessages((prevMessages) => [...prevMessages, apiMessage]);

    // Reset the input field
    setInputMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent new line in textarea
      handleSendMessage();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Chat with Baymax
        </h2>

        <div className="mb-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full p-2 border rounded-md cursor-pointer"
          />
        </div>

        <div className="chat-window bg-gray-200 p-4 rounded-lg overflow-y-auto h-80 mb-4">
          {messages.length > 0 ? (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 ${
                  msg.type === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    msg.type === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  <p>{msg.content}</p>
                  <span className="text-xs text-gray-600 block">
                    {msg.date.toDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages yet...</p>
          )}
        </div>

        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 p-2 border rounded-md"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
