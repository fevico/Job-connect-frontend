import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'; // Import PropTypes
import useSession from "./useSession";

// PrivateRoute to protect routes for authenticated users only
function PrivateRoute({ children }) {
  const { isSignedIn } = useSession();

  return isSignedIn ? children : <Navigate to="/login" />;
}

// AuthRoute to redirect authenticated users away from auth pages
function AuthRoute({ children }) {
  const { isSignedIn } = useSession();

  return isSignedIn ? <Navigate to="/" /> : children;
}

// Define prop types for both components
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // children must be a valid React node
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired, // children must be a valid React node
};

export { PrivateRoute, AuthRoute };
