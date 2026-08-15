import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

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

  if (!profile) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="dashboard-page">

      <div className="dashboard-card">

        <div className="dashboard-logo">
          🔐
        </div>

        <h1>SecureVault</h1>

        <p className="dashboard-subtitle">
          Your credentials, protected securely.
        </p>

        <div className="dashboard-welcome">
          <h2>Welcome, {profile.fullName} </h2>
          <p>{profile.email}</p>
        </div>

        <button
          className="vault-button"
          onClick={() => navigate("/vault")}
        >
          🔐 Open Secure Vault
        </button>

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