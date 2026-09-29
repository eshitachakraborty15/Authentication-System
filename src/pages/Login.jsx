import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../auth/AuthContext";


// --------------------------------------------------
// PASSWORD STRENGTH
// --------------------------------------------------

function checkPasswordStrength(
  password
) {

  if (!password) {

    return {

      level: 0,

      text: "ENTER PASSWORD"

    };

  }


  let score = 0;


  if (password.length >= 6) {

    score++;

  }


  if (password.length >= 10) {

    score++;

  }


  if (/[A-Z]/.test(password)) {

    score++;

  }


  if (/[0-9]/.test(password)) {

    score++;

  }


  if (
    /[^A-Za-z0-9]/.test(password)
  ) {

    score++;

  }


  if (score <= 2) {

    return {

      level: 1,

      text: "WEAK"

    };

  }


  if (score <= 4) {

    return {

      level: 2,

      text: "MEDIUM"

    };

  }


  return {

    level: 3,

    text: "STRONG"

  };

}


// --------------------------------------------------
// LOGIN PAGE
// --------------------------------------------------

export default function Login() {

  const navigate =
    useNavigate();


  const {
    login
  } = useAuth();


  const [username, setUsername] =
    useState("");


  const [password, setPassword] =
    useState("");


  const [rememberMe, setRememberMe] =
    useState(false);


  const [showPassword, setShowPassword] =
    useState(false);


  const [error, setError] =
    useState("");


  const strength =
    checkPasswordStrength(
      password
    );


  // ------------------------------------------------
  // HANDLE LOGIN
  // ------------------------------------------------

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");


    if (!username.trim()) {

      setError(
        "Username is required."
      );

      return;

    }


    if (!password) {

      setError(
        "Password is required."
      );

      return;

    }


    const result =
      login(
        username,
        password,
        rememberMe
      );


    if (!result.success) {

      setError(
        result.message
      );

      return;

    }


    navigate(
      "/dashboard",
      {
        replace: true
      }
    );

  };


  return (

    <div className="login-page">


      <div className="background-grid"></div>


      <div className="glow glow-one"></div>

      <div className="glow glow-two"></div>



      <div className="login-card">


        <div className="top-line"></div>


        {/* LOGO */}

        <div className="logo">

          ◈

        </div>


        <div className="login-heading">

          <span className="system-label">
            AUTHENTICATION SYSTEM
          </span>


          <h1>

            Welcome to

            <br />

            <span>
              NIGHTVAULT
            </span>

          </h1>


          <p>
            Secure access to your
            private workspace.
          </p>

        </div>



        <form
          onSubmit={handleSubmit}
          className="login-form"
        >


          {/* USERNAME */}

          <div className="field">

            <label>
              USERNAME
            </label>


            <div className="input-box">

              <span className="input-icon">
                ◉
              </span>


              <input

                type="text"

                value={username}

                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }

                placeholder="Enter username"

              />

            </div>

          </div>



          {/* PASSWORD */}

          <div className="field">

            <label>
              PASSWORD
            </label>


            <div className="input-box">

              <span className="input-icon">
                ◆
              </span>


              <input

                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                value={password}

                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }

                placeholder="Enter password"

              />


              <button

                type="button"

                className="show-button"

                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }

              >

                {showPassword
                  ? "HIDE"
                  : "SHOW"}

              </button>

            </div>



            {/* PASSWORD STRENGTH */}

            <div className="strength">

              <div className="strength-bars">

                {[1, 2, 3].map(
                  (bar) => (

                    <span
                      key={bar}

                      className={
                        strength.level >= bar
                          ? `active strength-${strength.level}`
                          : ""
                      }

                    ></span>

                  )
                )}

              </div>


              <div className="strength-text">

                PASSWORD STRENGTH:

                <strong>
                  {" "}
                  {strength.text}
                </strong>

              </div>

            </div>

          </div>



          {/* REMEMBER ME */}

          <label className="remember">

            <input

              type="checkbox"

              checked={
                rememberMe
              }

              onChange={(e) =>
                setRememberMe(
                  e.target.checked
                )
              }

            />


            <span>
              Remember me
            </span>

          </label>



          {/* ERROR */}

          {error && (

            <div className="error-box">

              <span>
                !
              </span>

              {error}

            </div>

          )}



          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-button"
          >

            <span>
              AUTHENTICATE
            </span>

            <span>
              →
            </span>

          </button>


        </form>



        <div className="security-footer">

          <span>
            ● SYSTEM ONLINE
          </span>

          <span>
            JWT SIMULATION
          </span>

        </div>


      </div>

    </div>

  );

}