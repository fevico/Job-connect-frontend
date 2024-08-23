import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import CustomButton from "../../components/CustomButton";

const VerifyAccount = () => {
  const [codes, setCodes] = useState(["", "", "", ""]);
  // const [id, setId] = useState(null); // Add a state variable for ID
  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const newCodes = [...codes];
    newCodes[index] = e.target.value;
    setCodes(newCodes);

    // Automatically focus the next input if a digit is entered
    if (e.target.value && index < codes.length - 1) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  // const getId = async () => {
  //   try {
  //     const response = await axios.post('https://jobkonnecta.com/api/user/register');
  //     const id = response.data.id; // Assuming the API returns the created item's ID
  //     setId(id); // Store the ID in state
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getId(); // Call getId when the component mounts
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    const id = localStorage.getItem('userId'); // Retrieve the stored user ID
    const code = codes.join(""); // Combine the individual codes into one string
  
    if (!id) {
      toast.error('ID is not available'); // Error if ID is not found
      return;
    }
  
    try {
      // Send verification request to the server
      const response = await axios.post(`https://jobkonnecta.com/api/user/verify-email/${id}`, { token: code });
  
      // Assuming the server returns the verification token in response.data.token
      navigate("/login"); // Redirect to login page on success
      toast.success("Verification successful!");

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      console.error(err.response?.data || {});
      console.error(err.response?.data?.message || err.message);
    }
  };
  

  const handleResend = async () => {
    try {
      await resendCode().unwrap();
      toast.success("Code resent successfully!");
    } catch (err) {
      toast.error("Failed to resend code");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-7 w-1/3 mt-[-15%]">
        <div>
          <h2 className="text-center text-2xl font-bold">Enter Verification Code</h2>
          <p className="text-[15px] mt-2">Check your email for your Verification code</p>
        </div>

        <div>
          <div className="flex justify-center space-x-2">
            {codes.map((code, index) => (
              <input
                key={index}
                id={`code-${index}`}
                className="w-12 text-center border-gray-400 outline-none border-2 rounded-md p-2"
                type="text"
                maxLength="1"
                value={code}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            ))}
          </div>
          <div className="flex justify-center space-x-4 mt-5">
            <CustomButton
              type="submit"
              text="Verify"
            />
            <CustomButton
              type="button"
              text="Resend Code"
              onClick={handleResend}
            />
          </div>
        </div>

      </form>
    </div>
  );
};

export default VerifyAccount;
