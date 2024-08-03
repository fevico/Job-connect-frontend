import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useLoginMutation } from "../../redux/appData";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [login, { isLoading, isSuccess, error }] = useLoginMutation(); // Using the useRegisterMutation hook
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: undefined }); // Clear error on input change
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post('http://jobkonnecta.com/api/user/login', data)
      const role = localStorage.getItem('userRole')
      const token = response.data;
      localStorage.setItem('authToken', token);
      console.log(response.role)
      
      if (role === 'employer') {
        toast.success("Login successful!");
        navigate('/dashboard')

      } else {
        navigate('/all-jobs')
      }
      console.log(response)
    } catch (err) {
      // Handle error
      toast.error("Login failed");
      setErrors(err.data);
      console.error(err);
    }
  };

  // React.useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("Login successful!");
  //     navigate("/");
  //   } else {
  //     toast.error("Login failed");
  //     setErrors(error);
  //   }
  // }, [isSuccess, navigate]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen mx-auto w-[90%] lg:w-[50%]">
        {" "}
        <form onSubmit={handleSubmit} className="w-full space-y-4 mb-6">
          <div className="w-[90%] mx-auto space-y-3">
            {errors && (
              <span className="text-red-500 text-xs">{errors.message}</span>
            )}
            {error && (
              <p className="text-red-500 text-center mt-2">{error.message}</p>
            )}

            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Email</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Password</label>
              <div className="relative w-full">
                <input
                  className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
            <div className="">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                // checked={termsAccepted}
                // onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <label htmlFor="terms" className="text-sm ml-2">
                Remember me
              </label>
            </div>
            <Link
              to={"/signup/home"}
              className="cursor-pointer underline lg:text-xl"
            >
              I don't have an account
            </Link>
          </div>
          </div>

         
          <div className="flex justify-start mt-4 w-[90%] mx-auto">
            <CustomButton
              type="submit"
              text={isLoading ? "Logging in..." : "Login"}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
}
