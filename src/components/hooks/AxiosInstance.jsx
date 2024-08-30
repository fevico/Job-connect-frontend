import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function useAxios() {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "https://jobkonnecta.com/api", // Set your base URL here
    headers: {
      Authorization: `Bearer ${cookies.authToken}`,
    },
  });

  // Request interceptor to include the token in headers
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = cookies?.authToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle 401 errors
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data?.message;
        if (errorMessage === "Token expired") {
          // Clear the token and redirect to login
          removeCookie("authToken", { path: "/" });
          
          // Save the current path to return to it after login
          const currentPath = window.location.pathname;
          navigate("/login", { state: { from: currentPath } });
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
