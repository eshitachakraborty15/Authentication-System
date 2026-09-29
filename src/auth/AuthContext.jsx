import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


// Create authentication context
const AuthContext = createContext();


// --------------------------------------------------
// JWT TOKEN SIMULATION
// --------------------------------------------------

function createJWT(username) {

  const header = {
    alg: "HS256",
    typ: "JWT"
  };


  const payload = {

    username: username,

    role: "user",

    issuedAt:
      new Date().toISOString(),

    expiresAt:
      new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ).toISOString()

  };


  const encode = (data) => {

    return btoa(
      JSON.stringify(data)
    );

  };


  const encodedHeader =
    encode(header);

  const encodedPayload =
    encode(payload);

  const signature =
    btoa("SIMULATED_SIGNATURE");


  return (
    encodedHeader +
    "." +
    encodedPayload +
    "." +
    signature
  );
}


// --------------------------------------------------
// DECODE JWT SIMULATION
// --------------------------------------------------

export function decodeJWT(token) {

  try {

    const parts =
      token.split(".");

    if (parts.length !== 3) {

      return null;

    }


    return JSON.parse(
      atob(parts[1])
    );

  } catch {

    return null;

  }
}


// --------------------------------------------------
// AUTH PROVIDER
// --------------------------------------------------

export function AuthProvider({
  children
}) {

  const [user, setUser] =
    useState(null);


  const [loading, setLoading] =
    useState(true);


  // ------------------------------------------------
  // CHECK EXISTING LOGIN
  // ------------------------------------------------

  useEffect(() => {

    const localToken =
      localStorage.getItem(
        "authToken"
      );


    const sessionToken =
      sessionStorage.getItem(
        "authToken"
      );


    const token =
      localToken || sessionToken;


    if (token) {

      const payload =
        decodeJWT(token);


      if (
        payload &&
        new Date(payload.expiresAt) >
        new Date()
      ) {

        setUser({

          username:
            payload.username,

          role:
            payload.role,

          token:
            token

        });

      } else {

        localStorage.removeItem(
          "authToken"
        );

        sessionStorage.removeItem(
          "authToken"
        );

      }

    }


    setLoading(false);

  }, []);


  // ------------------------------------------------
  // LOGIN
  // ------------------------------------------------

  const login = (
    username,
    password,
    rememberMe
  ) => {

    if (!username.trim()) {

      return {

        success: false,

        message:
          "Username is required."

      };

    }


    if (!password) {

      return {

        success: false,

        message:
          "Password is required."

      };

    }


    const token =
      createJWT(
        username.trim()
      );


    const userData = {

      username:
        username.trim(),

      role: "user",

      token

    };


    // ----------------------------------------------
    // REMEMBER USER
    // ----------------------------------------------

    if (rememberMe) {

      localStorage.setItem(
        "authToken",
        token
      );


      sessionStorage.removeItem(
        "authToken"
      );

    } else {

      sessionStorage.setItem(
        "authToken",
        token
      );


      localStorage.removeItem(
        "authToken"
      );

    }


    setUser(userData);


    return {

      success: true

    };

  };


  // ------------------------------------------------
  // LOGOUT
  // ------------------------------------------------

  const logout = () => {

    localStorage.removeItem(
      "authToken"
    );


    sessionStorage.removeItem(
      "authToken"
    );


    setUser(null);

  };


  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}


// Custom hook

export function useAuth() {

  return useContext(
    AuthContext
  );

}