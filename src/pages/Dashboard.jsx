import {
  useAuth
} from "../auth/AuthContext";

import {
  useNavigate
} from "react-router-dom";


export default function Dashboard() {

  const {
    user,
    logout
  } = useAuth();


  const navigate =
    useNavigate();


  const handleLogout = () => {

    logout();

    navigate(
      "/login",
      {
        replace: true
      }
    );

  };


  return (

    <div className="dashboard-page">


      {/* HEADER */}

      <header className="dashboard-header">


        <div className="dashboard-brand">

          <div className="small-logo">
            ◈
          </div>


          <div>

            <h2>
              NIGHT<span>VAULT</span>
            </h2>

            <small>
              AUTHENTICATION SYSTEM
            </small>

          </div>

        </div>



        <div className="header-user">

          <div className="avatar">

            {user?.username
              ?.charAt(0)
              ?.toUpperCase()}

          </div>


          <div>

            <strong>
              {user?.username}
            </strong>

            <span>
              ● AUTHENTICATED
            </span>

          </div>


          <button
            onClick={handleLogout}
          >
            LOGOUT
          </button>

        </div>


      </header>



      {/* MAIN */}

      <main className="dashboard-content">


        <div className="welcome">

          <span>
            ACCESS GRANTED
          </span>


          <h1>
            Welcome,
            <br />

            <strong>
              {user?.username}
            </strong>
          </h1>


          <p>
            Your authentication was
            successful. This is a protected
            dashboard.
          </p>

        </div>



        {/* STATUS CARDS */}

        <div className="security-grid">


          <div className="security-card">

            <div className="card-symbol">
              ◉
            </div>

            <span>
              ACCOUNT STATUS
            </span>

            <h3>
              AUTHENTICATED
            </h3>

            <small>
              Active session detected
            </small>

          </div>



          <div className="security-card">

            <div className="card-symbol">
              ◆
            </div>

            <span>
              ACCESS LEVEL
            </span>

            <h3>
              USER
            </h3>

            <small>
              Standard account privileges
            </small>

          </div>



          <div className="security-card">

            <div className="card-symbol">
              ◇
            </div>

            <span>
              TOKEN SYSTEM
            </span>

            <h3>
              JWT SIMULATION
            </h3>

            <small>
              Client-side demonstration
            </small>

          </div>


        </div>



        {/* INFORMATION */}

        <section className="protected-panel">


          <div className="panel-heading">

            <div>

              <span>
                PROTECTED RESOURCE
              </span>

              <h2>
                Authentication Dashboard
              </h2>

            </div>


            <div className="online-indicator">
              ● ONLINE
            </div>

          </div>



          <div className="info-grid">


            <div>

              <label>
                USERNAME
              </label>

              <strong>
                {user?.username}
              </strong>

            </div>


            <div>

              <label>
                ROLE
              </label>

              <strong>
                {user?.role}
              </strong>

            </div>


            <div>

              <label>
                AUTHENTICATION
              </label>

              <strong>
                JWT TOKEN
              </strong>

            </div>


            <div>

              <label>
                ACCESS
              </label>

              <strong>
                PROTECTED
              </strong>

            </div>


          </div>


        </section>



        {/* ASSIGNMENT FEATURES */}

        <section className="features-section">

          <span>
            ASSIGNMENT 7
          </span>

          <h2>
            Authentication Features
          </h2>


          <div className="feature-list">


            <div>
              ✓
              <span>
                Login
              </span>
            </div>


            <div>
              ✓
              <span>
                Logout
              </span>
            </div>


            <div>
              ✓
              <span>
                Protected Dashboard
              </span>
            </div>


            <div>
              ✓
              <span>
                Remember User
              </span>
            </div>


            <div>
              ✓
              <span>
                JWT Token Simulation
              </span>
            </div>


            <div>
              ✓
              <span>
                Password Validation
              </span>
            </div>


          </div>

        </section>


      </main>


      <footer className="dashboard-footer">

        NIGHTVAULT

        <span>
          •
        </span>

        REACT AUTHENTICATION SYSTEM

      </footer>


    </div>

  );

}