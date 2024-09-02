import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode

export default function useSession() {
  // Check if the user is signed in by checking if the authToken exists in cookies
  const isSignedIn = !!Cookies.get("authToken");
  let userDetails = null;

  if (isSignedIn) {
    try {
      // Decode the JWT token to get user details
      userDetails = jwtDecode(Cookies.get("authToken"));
    } catch (error) {
      console.error("Failed to decode token:", error);
      userDetails = null;
    }
  }

  const signIn = (token) => {
    // Set the authToken cookie
    Cookies.set("authToken", token, { path: "/" });
  };

  const signOut = () => {
    // Remove the authToken cookie
    Cookies.remove("authToken", { path: "/" });
  };

  return { isSignedIn, userDetails, signIn, signOut };
}
