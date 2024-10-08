import axios from "axios";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const CreateReportModal = ({ id, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  //   const [id, setId] = useState("");
  const [url, setUrl] = useState("");
  const [recordType, setRecordType] = useState("");
  const [successModal, setSuccessModal] = useState(false);


  const getFormattedDate = () => {
    const date = new Date();
  
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad it to 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-based index) and pad to 2 digits
    const year = String(date.getFullYear()).slice(2); // Get the last two digits of the year
  
    return `${day}/${month}/${year}`;
  };

  const handleAddPatient = async () => {
    if (isLoading) return;
    setIsLoading(true);
    console.log("id: ", id);

    const key = localStorage.getItem("key");

    if (!key) {
      console.log("Key not found...");
      setIsLoading(false);
      return;
    }

    const data = {
      name: name,
      url: url,
      date: getFormattedDate(),
      record_type: recordType,
    };
    console.log("data: ", data);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/records/",
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
          onClose();
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
  return (
    <div
      className="flex justify-center w-full fixed top-0 left-0 px-3 backdrop-blur-md z-[100] h-screen"
      data-aos="fade-in"
    >
      {!successModal ? (
        <div className="flex flex-col gap-10 my-20 bg-gradient-to-r from-[#ccc3735c] to-[#b36565aa] p-8 sm:p-10 rounded-3xl max-w-xl z-50">
          <div className="flex flex-col gap-10">
            <div className="flex justify-end">
              <IoClose onClick={onClose} size={40} className="cursor-pointer" />
            </div>
            <div className="flex flex-col gap-3 w-96 font-mono">
              <div className="flex flex-col">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-1 rounded-lg bg-slate-100 outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label>url</label>
                <input
                  type="text"
                  placeholder="enter the url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="p-1 rounded-lg bg-slate-100 outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label>Record Type</label>
                <select
                  placeholder="enter sex orientation of patient"
                  value={recordType}
                  onChange={(e) => setRecordType(e.target.value)}
                  className="p-1 rounded-lg bg-slate-100 outline-none cursor-pointer"
                >
                  <option selected disabled value="">
                    select report type
                  </option>
                  <option value="diagnoses">Medical Record</option>
                  <option value="medications">Transcripts</option>
                  <option value="labresult">Photos</option>
                </select>
              </div>
              {/* <div className="flex flex-col">
                <label>Doctor</label>
                <input
                  placeholder="enter doctor assigned to patient"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="p-1 rounded-lg bg-slate-100 outline-none"
                />
              </div> */}
            </div>

            <div className="flex justify-center">
              <button
                className={`p-2 px-14 sm:px-20 rounded-2xl bg-gradient-to-r from-[#67cd8e] to-[#4285d6] text-white cursor-pointer ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
                onClick={handleAddPatient}
                // disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Loading..." : "Add Report"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center h-screen w-screen items-center">
          <FaCheckCircle size={100} data-aos="zoom-in" color="green" />
        </div>
      )}
    </div>
  );
};
export default CreateReportModal;
