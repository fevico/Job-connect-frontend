import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useSession from "../../components/hooks/useSession";

export default function Login() {
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { signIn } = useSession();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: undefined }); // Clear error on input change
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post(
         "https://jobkonnecta.com/api/user/login",
        // "http://localhost:5000/user/login",
        data
      );
      const token = response.data.token;
      // localStorage.setItem("authToken", token);
      // setCookie("authToken", token, { path: "/", maxAge: 3600 });
      signIn(token);
      // console.log(response.data.data.role)
      setLoading(false);
      navigate(from);
      console.log(response);
    } catch (err) {
      // Handle error
      setLoading(false);
      toast.error("Login failed");

      setErrors(err.response.data);
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
      <div className="flex items-center justify-center min-h-screen mx-auto w-[90%] lg:w-[45%]">
        {" "}
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4 mb-6 bg-gray-300 py-5"
        >
          <div className="w-[90%] mx-auto space-y-3">
            {errors && (
              <span className="text-red-500 text-xs">{errors.message}</span>
            )}
            {/* {error && (
              <p className="text-red-500 text-center mt-2">{error.message}</p>
            )} */}

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
                I don&apos;t have an account
              </Link>
            </div>
          </div>

          <div className="flex justify-start mt-4 w-[90%] mx-auto">
            <CustomButton
              type="submit"
              text={loading ? "Logging in..." : "Login"}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </>
  );
}
