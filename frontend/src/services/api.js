import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (data) =>
  api.post("/auth/register", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const forgotPassword = (data) =>
  api.post("/auth/forgot-password", data);

export const verifyOtp = (data) =>
  api.post("/auth/verify-otp", data);

export const resetPassword = (data) =>
  api.post("/auth/reset-password", data);

export const getProfile = () =>
  api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getVaultEntries = () =>
  api.get("/vault", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getSharedVaultEntries = () =>
  api.get("/vault/shared", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const addVaultEntry = (data) =>
  api.post("/vault", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateVaultEntry = (id, data) =>
  api.put(`/vault/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const deleteVaultEntry = (id) =>
  api.delete(`/vault/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const shareVaultEntry = (
  id,
  email,
  permission,
  expiryDate
) => {
  let url =
    `/vault/${id}/share?sharedWithEmail=${encodeURIComponent(
      email
    )}&permission=${permission}`;

  if (expiryDate) {
    url += `&expiryDate=${expiryDate}`;
  }

  return api.post(url, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};


/* =========================================================
   SECURITY
   ========================================================= */

/* Login Monitoring */

export const getLoginActivities = () =>
  api.get("/login-activities", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


/* Suspicious Activities */

export const getSuspiciousActivities = () =>
  api.get("/suspicious-activities", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


/* Security Alerts */

export const getSecurityAlerts = () =>
  api.get("/security-alerts", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


/* Audit Logs */

export const getAuditLogs = () =>
  api.get("/audit-logs", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


/* Security Analytics */

export const getSecurityAnalytics = () =>
  api.get("/security-analytics", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

/* =========================================================
   REPORTS
   ========================================================= */

/* Password Health Report */

export const getPasswordHealthReport = () =>
  api.get("/reports/password-health", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


/* Login Activity Report */

export const getLoginActivityReport = () =>
  api.get("/reports/login-activity", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  
export default api;