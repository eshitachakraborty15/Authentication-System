import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import {
  useAuth
} from "./auth/AuthContext";


import Login
  from "./pages/Login";


import Dashboard
  from "./pages/Dashboard";


import ProtectedRoute
  from "./components/ProtectedRoute";



function LoginRoute() {

  const {
    user
  } = useAuth();


  if (user) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }


  return <Login />;

}



export default function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* LOGIN */}

        <Route
          path="/login"
          element={
            <LoginRoute />
          }
        />


        {/* PROTECTED DASHBOARD */}

        <Route

          path="/dashboard"

          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>

          }

        />


        {/* DEFAULT */}

        <Route

          path="/"

          element={

            <Navigate
              to="/dashboard"
              replace
            />

          }

        />


        {/* UNKNOWN URL */}

        <Route

          path="*"

          element={

            <Navigate
              to="/"
              replace
            />

          }

        />


      </Routes>

    </BrowserRouter>

  );

}