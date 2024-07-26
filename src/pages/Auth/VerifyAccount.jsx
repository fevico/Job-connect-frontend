import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useVerifyCodeMutation, useResendCodeMutation } from "../../redux/appData"; // Assuming you have mutations for verifying and resending the code
import { toast } from "react-toastify";
import CustomButton from "../../components/CustomButton";

const VerifyAccount = () => {
  const [codes, setCodes] = useState(["", "", "", ""]);
//   const [verifyCode, { isLoading }] = useVerifyCodeMutation();
//   const [resendCode, { isLoading: isResending }] = useResendCodeMutation();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = codes.join("");
    try {
      await verifyCode({ code }).unwrap();
      toast.success("Verification successful!");
      navigate("/login");
    } catch (err) {
      toast.error("Verification failed");
      console.error(err);
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
      <form onSubmit={handleSubmit} className="space-y-4 w-1/3">
        <h2 className="text-center text-2xl font-bold">Enter Verification Code</h2>
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
        {/* {isLoading && <p className="text-center text-gray-500">Verifying...</p>} */}
        <div className="flex justify-center space-x-4">
          <CustomButton
            type="submit"
            text="Verify"
            // disabled={isLoading}
          />
          <CustomButton
            type="button"
            // text={isResending ? "Resending..." : "Resend Code"}
            text={"hell"}
            onClick={handleResend}
            // disabled={isResending}
          />
        </div>
      </form>
    </div>
  );
};

export default VerifyAccount;
