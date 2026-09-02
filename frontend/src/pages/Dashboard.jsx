import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setProfile(response.data);
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleSecurity = () => {
    setShowSecurity(!showSecurity);
    setShowCredentials(false);
    setShowAnalytics(false);
  };

  const toggleCredentials = () => {
    setShowCredentials(!showCredentials);
    setShowSecurity(false);
    setShowAnalytics(false);
  };

  const toggleAnalytics = () => {
    setShowAnalytics(!showAnalytics);
    setShowSecurity(false);
    setShowCredentials(false);
  };

  if (!profile) {
    return (
      <div className="dashboard-loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      <div className="dashboard-card">

        {/* LOGO */}

        <div className="dashboard-logo">
          🔐
        </div>

        <h1>SecureVault</h1>


        {/* WELCOME */}

        <div className="dashboard-welcome">
          <h2>
            Welcome, {profile.fullName}
          </h2>
        </div>


        {/* ================= MAIN FEATURES ================= */}

        <div className="dashboard-features">


          {/* ================= SECURITY ================= */}

          <div className="dashboard-menu">

            <button
              className="dashboard-menu-button security-menu-button"
              onClick={toggleSecurity}
            >

              <span className="dashboard-menu-left">

                <span className="dashboard-menu-icon">
                  🛡️
                </span>

                <span>

                  <span className="dashboard-menu-title">
                    Security
                  </span>

                  <span className="dashboard-menu-description">
                    Monitor and protect your account
                  </span>

                </span>

              </span>

              <span className="dashboard-menu-arrow">
                {showSecurity ? "▲" : "▼"}
              </span>

            </button>


            {showSecurity && (

              <div className="dashboard-submenu">


                {/* LOGIN MONITORING */}

                <button
                  className="dashboard-submenu-item"
                  onClick={() =>
                    navigate("/login-monitoring")
                  }
                >

                  <span className="dashboard-submenu-left">

                    <span className="dashboard-submenu-icon">
                      📊
                    </span>

                    <span>

                      <span className="dashboard-submenu-title">
                        Login Monitoring
                      </span>

                      <span className="dashboard-submenu-description">
                        Track successful and failed login activities
                      </span>

                    </span>

                  </span>

                  <span className="dashboard-submenu-arrow">
                    →
                  </span>

                </button>


                {/* SECURITY ALERTS */}

                <button
                  className="dashboard-submenu-item"
                  onClick={() =>
                    navigate("/security-alerts")
                  }
                >

                  <span className="dashboard-submenu-left">

                    <span className="dashboard-submenu-icon">
                      🚨
                    </span>

                    <span>

                      <span className="dashboard-submenu-title suspicious-title">
                        Security Alerts
                      </span>

                      <span className="dashboard-submenu-description">
                        View important security alerts
                      </span>

                    </span>

                  </span>

                  <span className="dashboard-submenu-arrow">
                    →
                  </span>

                </button>


                {/* SUSPICIOUS ACTIVITY */}

                <button
                  className="dashboard-submenu-item"
                  onClick={() =>
                    navigate("/suspicious-activities")
                  }
                >

                  <span className="dashboard-submenu-left">

                    <span className="dashboard-submenu-icon">
                      ⚠️
                    </span>

                    <span>

                      <span className="dashboard-submenu-title">
                        Suspicious Activity
                      </span>

                      <span className="dashboard-submenu-description">
                        View detected suspicious activities
                      </span>

                    </span>

                  </span>

                  <span className="dashboard-submenu-arrow">
                    →
                  </span>

                </button>


                {/* AUDIT LOGS */}

                <button
                  className="dashboard-submenu-item"
                  onClick={() =>
                    navigate("/audit-logs")
                  }
                >

                  <span className="dashboard-submenu-left">

                    <span className="dashboard-submenu-icon">
                      📋
                    </span>

                    <span>

                      <span className="dashboard-submenu-title">
                        Audit Logs
                      </span>

                      <span className="dashboard-submenu-description">
                        View the history of security activities
                      </span>

                    </span>

                  </span>

                  <span className="dashboard-submenu-arrow">
                    →
                  </span>

                </button>

              </div>

            )}

          </div>


          {/* ================= CREDENTIALS ================= */}

          <div className="dashboard-menu">

            <button
              className="dashboard-menu-button credentials-menu-button"
              onClick={toggleCredentials}
            >

              <span className="dashboard-menu-left">

                <span className="dashboard-menu-icon">
                  🔐
                </span>

                <span>

                  <span className="dashboard-menu-title">
                    Credentials
                  </span>

                  <span className="dashboard-menu-description">
                    Securely manage your saved credentials
                  </span>

                </span>

              </span>

              <span className="dashboard-menu-arrow">
                {showCredentials ? "▲" : "▼"}
              </span>

            </button>


            {showCredentials && (

              <div className="dashboard-submenu">


                {/* ADD CREDENTIAL */}

                <button
                  className="dashboard-submenu-item"
                  onClick={() =>
                    navigate("/vault/add")
                  }
                >

                  <span className="dashboard-submenu-left">

                    <span className="dashboard-submenu-icon">
                      ➕
                    </span>

                    <span>

                      <span className="dashboard-submenu-title">
                        Add Credential
                      </span>

                      <span className="dashboard-submenu-description">
                        Save a new credential securely
                      </span>

                    </span>

                  </span>

                  <span className="dashboard-submenu-arrow">
                    →
                  </span>

                </button>


                {/* VIEW CREDENTIALS */}

                <button
                  className="dashboard-submenu-item"
                  onClick={() =>
                    navigate("/vault/credentials")
                  }
                >

                  <span className="dashboard-submenu-left">

                    <span className="dashboard-submenu-icon">
                      👁️
                    </span>

                    <span>

                      <span className="dashboard-submenu-title">
                        View Credentials
                      </span>

                      <span className="dashboard-submenu-description">
                        View and manage your saved credentials
                      </span>

                    </span>

                  </span>

                  <span className="dashboard-submenu-arrow">
                    →
                  </span>

                </button>

              </div>

            )}

          </div>


          {/* ================= SECURITY ANALYTICS ================= */}

          <div className="dashboard-menu">

            <button
              className="dashboard-menu-button analytics-menu-button"
              onClick={toggleAnalytics}
            >

              <span className="dashboard-menu-left">

                <span className="dashboard-menu-icon">
                  📈
                </span>

                <span>

                  <span className="dashboard-menu-title">
                    Security Analytics
                  </span>

                  <span className="dashboard-menu-description">
                    View security statistics and recent activity
                  </span>

                </span>

              </span>

              <span className="dashboard-menu-arrow">
                {showAnalytics ? "▲" : "▼"}
              </span>

            </button>


            {showAnalytics && (

              <div className="dashboard-submenu">

                {/* ANALYTICS DASHBOARD */}

                <button
                  className="dashboard-submenu-item"
                  onClick={() =>
                    navigate("/security-analytics")
                  }
                >

                  <span className="dashboard-submenu-left">

                    <span className="dashboard-submenu-icon">
                      📊
                    </span>

                    <span>

                      <span className="dashboard-submenu-title">
                        Analytics Dashboard
                      </span>

                      <span className="dashboard-submenu-description">
                        View login statistics, alerts and recent activity
                      </span>

                    </span>

                  </span>

                  <span className="dashboard-submenu-arrow">
                    →
                  </span>

                </button>


                {/* SECURITY REPORTS */}

                <button
                  className="dashboard-submenu-item"
                  onClick={() =>
                    navigate("/reports")
                  }
                >

                  <span className="dashboard-submenu-left">

                    <span className="dashboard-submenu-icon">
                      📑
                    </span>

                    <span>

                      <span className="dashboard-submenu-title">
                        Security Reports
                      </span>

                      <span className="dashboard-submenu-description">
                        View password health and login activity reports
                      </span>

                    </span>

                  </span>

                  <span className="dashboard-submenu-arrow">
                    →
                  </span>

                </button>

              </div>

            )}

          </div>


        </div>


        {/* ================= LOGOUT ================= */}

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;