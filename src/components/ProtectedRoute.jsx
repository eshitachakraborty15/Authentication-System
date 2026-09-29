import {
  Navigate
} from "react-router-dom";

import {
  useAuth
} from "../auth/AuthContext";


export default function ProtectedRoute({
  children
}) {

  const {
    user,
    loading
  } = useAuth();


  // Wait for authentication check
  if (loading) {

    return (

      <div className="loading-screen">

        <div className="loader"></div>

        <p>
          VERIFYING ACCESS...
        </p>

      </div>

    );

  }


  // Not authenticated
  if (!user) {

    return (

      <Navigate
        to="/login"
        replace
      />

    );

  }


  return children;

}