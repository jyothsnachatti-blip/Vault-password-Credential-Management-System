import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
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
  export const shareVaultEntry = (id, email, permission) =>
  api.post(
    `/vault/${id}/share?sharedWithEmail=${encodeURIComponent(email)}&permission=${permission}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  export default api;
