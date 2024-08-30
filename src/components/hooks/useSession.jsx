import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

export default function useSession() {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const isSignedIn = !!cookies.authToken;
  let userDetails = null;

  if (isSignedIn) {
    try {
      // Decode the JWT token to get user details
      userDetails = jwtDecode(cookies.authToken);
    } catch (error) {
      console.error("Failed to decode token:", error);
      userDetails = null;
    }
  }

  const signIn = (token) => {
    setCookie("authToken", token, { path: "/" });
  };

  const signOut = () => {
    removeCookie("authToken", { path: "/" });
  };

  return { isSignedIn, userDetails, signIn, signOut };
}
