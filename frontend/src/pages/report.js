import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import DatePicker from "react-datepicker";

// import AddPatientModal from "../components/addPatientModal";
import AddReportModal from "../components/uploadModal";
import CreateReportModal from "../components/createReportModal";

import { FiExternalLink } from "react-icons/fi";
import SuccessModal from "../components/successModal";

export default function Report() {
  const navigate = useNavigate();

  const [reportData, setReportData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [createReportModal, setCreateReportModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchReportData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const key = localStorage.getItem("key");

    if (!key) {
      console.log("Key not found...");
      setIsLoading(false);
      return;
    }
    console.log("patient fetching...");

    try {
      const response = await axios.get(`http://127.0.0.1:8000/createReport/`, {
        headers: {
          Authorization: `token ${key}`,
        },
      });

      console.log("patient response: ", response);

      if (response?.data) {
        setReportData(response?.data);
      } else {
        setReportData([]);
      }
    } catch (error) {
      console.log("Error occurred: ", error);
      //   alert("No Patient data found...");
    } finally {
      setIsLoading(false);
    }
  };

  const getFormattedDate = () => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad it to 2 digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-based index) and pad to 2 digits
    const year = String(date.getFullYear()).slice(2); // Get the last two digits of the year

    return `${day}/${month}/${year}`;
  };

  const handleCreateReport = async () => {
    // if (isLoading) return;
    setIsLoading(true);

    const key = localStorage.getItem("key");

    if (!key) {
      console.log("Key not found...");
      setIsLoading(false);
      return;
    }

    const formattedDate = selectedDate.toISOString().split("T")[0];

    const data = {
      date: formattedDate,
    };
    console.log("data: ", data);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/createReport/",
        data,
        {
          headers: {
            Authorization: `token ${key}`,
          },
        }
      );

      console.log("response: ", response);

      if (response) {
        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
          fetchReportData();
          // onClose();
        }, 2000);
        // onLogin(); // Call the onLogin function to update the authentication state
      } else {
        console.error("Invalid response data:", response.data);
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.log("Error occurred: ", error);
      alert("Invalid credentials. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  const handleCreateReportModalOnClose = () => {
    fetchReportData();
    setCreateReportModal(false);
  };

  return (
    <div className="page2 flex flex-col gap-3 max-sm:w-screen p-5 sm:p-10">
      <div className="flex flex-col sm:flex-row gap-5">
        <span className="text-[20px] font-serif font-semibold p-3">
          Report History
        </span>
        <div className="flex gap-2 items-center justify-center">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full p-2 border rounded-md cursor-pointer"
          />
          <button
            className="p-1 sm:p-2 sm:px-4 rounded-lg bg-gradient-to-tr from-[#88f658db] to-[#426b0c]"
            onClick={() => handleCreateReport()}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Create Report"}
          </button>
        </div>
      </div>
      {reportData?.length > 0 ? (
        <div className="flex flex-col gap-3 overflow-y-scroll p-5 h-[37rem] bg-black bg-opacity-10">
          {reportData?.map((data, index) => (
            <div className="relative bg-red-500 bg-opacity-30 p-3 rounded-tr-xl rounded-bl-xl pr-10">
              <span className="">{data?.summary}</span>
              <span className="absolute right-2 bottom-2 text-[12px]">{data?.date}</span>
            </div>
          ))}
        </div>
      ) : (
        <>No reports generated...</>
      )}

      {successModal && <SuccessModal message="Report created successfully" />}
    </div>
  );
}
