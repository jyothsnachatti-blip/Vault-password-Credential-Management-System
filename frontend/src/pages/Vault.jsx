import { useEffect, useState } from "react";
import {
  getVaultEntries,
  getSharedVaultEntries,
  addVaultEntry,
  updateVaultEntry,
  deleteVaultEntry,
  shareVaultEntry,
} from "../services/api";
import "./Vault.css";

function Vault() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showShareForm, setShowShareForm] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [shareEmail, setShareEmail] = useState("");
  const [sharePermission, setSharePermission] = useState("VIEW");

  const [form, setForm] = useState({
    website: "",
    username: "",
    password: "",
    notes: "",
  });

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const myResponse = await getVaultEntries();

      const myEntries = Array.isArray(myResponse.data)
        ? myResponse.data.map((entry) => ({
            ...entry,
            isShared: false,
            permission: "OWNER",
          }))
        : [];

      let sharedEntries = [];

      try {
        const sharedResponse = await getSharedVaultEntries();

        if (Array.isArray(sharedResponse.data)) {
          sharedEntries = sharedResponse.data.map((entry) => ({
            ...entry,
            isShared: true,
            permission: entry.permission || "VIEW",
          }));
        }
      } catch (sharedError) {
        console.error("Error loading shared credentials:", sharedError);
      }

      setEntries([...myEntries, ...sharedEntries]);
    } catch (error) {
      console.error("Error loading vault entries:", error);
      setEntries([]);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateVaultEntry(editingId, form);
        alert("Credential updated successfully!");
      } else {
        await addVaultEntry(form);
        alert("Credential added successfully!");
      }

      setShowForm(false);
      setEditingId(null);

      setForm({
        website: "",
        username: "",
        password: "",
        notes: "",
      });

      setPasswordStrength("");
      await loadEntries();
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Operation failed");
      } else {
        alert("Server error");
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this credential?"
    );

    if (!confirmDelete) return;

    try {
      await deleteVaultEntry(id);

      alert("Credential deleted successfully");

      await loadEntries();
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Delete failed");
      } else {
        alert("Server error");
      }
    }
  };

  const handleEdit = (entry) => {
    if (entry.isShared && entry.permission !== "EDIT") {
      alert("You only have VIEW permission for this credential.");
      return;
    }

    setEditingId(entry.id);

    setForm({
      website: entry.website,
      username: entry.username,
      password: entry.password,
      notes: entry.notes || "",
    });

    setPasswordStrength("");
    setShowForm(true);
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyPassword = async (password) => {
    try {
      await navigator.clipboard.writeText(password);
      alert("Password copied successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to copy password.");
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength("Weak");
      return;
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const score =
      Number(hasUppercase) +
      Number(hasLowercase) +
      Number(hasNumber) +
      Number(hasSpecial);

    if (password.length >= 8 && score === 4) {
      setPasswordStrength("Strong");
    } else if (score >= 2) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  };

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}<>?";

    const allCharacters =
      uppercase +
      lowercase +
      numbers +
      symbols;

    let password = "";

    for (let i = 0; i < 12; i++) {
      password += allCharacters.charAt(
        Math.floor(Math.random() * allCharacters.length)
      );
    }

    setForm({
      ...form,
      password: password,
    });

    checkPasswordStrength(password);
  };

  const handleShare = async () => {
    if (!shareEmail.trim()) {
      alert("Please enter the user's email.");
      return;
    }

    if (!selectedEntry) {
      alert("No credential selected.");
      return;
    }

    try {
      await shareVaultEntry(
        selectedEntry.id,
        shareEmail.trim(),
        sharePermission
      );

      alert(
        `Credential shared successfully with ${shareEmail.trim()}`
      );

      setShowShareForm(false);
      setSelectedEntry(null);
      setShareEmail("");
      setSharePermission("VIEW");

      await loadEntries();
    } catch (error) {
      console.error("Share error:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Failed to share credential."
        );
      } else {
        alert("Server error.");
      }
    }
  };

  const filteredEntries = entries.filter((entry) =>
    (entry.website || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="vault-container">

      <h1>🔐 SecureVault</h1>

      <div className="vault-header">
        <h2>Password Vault</h2>

        <button
          className="add-btn"
          onClick={() => {
            setEditingId(null);

            setForm({
              website: "",
              username: "",
              password: "",
              notes: "",
            });

            setPasswordStrength("");
            setShowForm(true);
          }}
        >
          + Add Credential
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search website..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="vault-form">
          <h3>
            {editingId ? "Edit Credential" : "Add Credential"}
          </h3>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="website"
              placeholder="Website"
              value={form.website}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => {
                handleChange(e);
                checkPasswordStrength(e.target.value);
              }}
              required
            />

            <button
              type="button"
              onClick={generatePassword}
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                padding: "8px 15px",
                cursor: "pointer",
                backgroundColor: "#14b8a6",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              🔐 Generate Password
            </button>

            {passwordStrength && (
              <p
                style={{
                  color:
                    passwordStrength === "Strong"
                      ? "#22c55e"
                      : passwordStrength === "Medium"
                      ? "#f59e0b"
                      : "#ef4444",
                  fontWeight: "bold",
                  marginTop: "5px",
                }}
              >
                Password Strength: {passwordStrength}
              </p>
            )}

            <textarea
              name="notes"
              placeholder="Notes"
              value={form.notes}
              onChange={handleChange}
            />

            <button type="submit">
              {editingId ? "Update" : "Save"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);

                setForm({
                  website: "",
                  username: "",
                  password: "",
                  notes: "",
                });

                setPasswordStrength("");
              }}
            >
              Cancel
            </button>

          </form>
        </div>
      )}

      {showShareForm && selectedEntry && (
        <div className="share-modal">
          <div className="share-modal-content">

            <h3>Share Credential</h3>

            <p>
              Share <strong>{selectedEntry.website}</strong>
            </p>

            <input
              type="email"
              placeholder="Enter user's email"
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
            />

            <select
              value={sharePermission}
              onChange={(e) =>
                setSharePermission(e.target.value)
              }
            >
              <option value="VIEW">View only</option>
              <option value="EDIT">View & Edit</option>
            </select>

            <div className="share-actions">

              <button
                type="button"
                onClick={() => {
                  setShowShareForm(false);
                  setSelectedEntry(null);
                  setShareEmail("");
                  setSharePermission("VIEW");
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleShare}
              >
                Share
              </button>

            </div>

          </div>
        </div>
      )}

      <table className="vault-table">

        <thead>
          <tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredEntries.length === 0 ? (

            <tr>
              <td
                colSpan="5"
                style={{ textAlign: "center" }}
              >
                No credentials found
              </td>
            </tr>

          ) : (

            filteredEntries.map((entry) => (

              <tr key={`${entry.isShared ? "shared" : "own"}-${entry.id}`}>

                <td>
                  {entry.isShared && (
                    <div className="shared-badge">
                      🔗 Shared · {entry.permission}
                    </div>
                  )}

                  {entry.website}
                </td>

                <td>
                  {entry.username}
                </td>

                <td>

                  {visiblePasswords[entry.id]
                    ? entry.password
                    : "•".repeat(
                        entry.password
                          ? entry.password.length
                          : 8
                      )}

                  <button
                    onClick={() =>
                      togglePasswordVisibility(entry.id)
                    }
                    style={{
                      marginLeft: "10px",
                      cursor: "pointer",
                      border: "none",
                      background: "transparent",
                      fontSize: "16px",
                    }}
                  >
                    {visiblePasswords[entry.id]
                      ? "Hide"
                      : "Show"}
                  </button>

                  <button
                    onClick={() =>
                      copyPassword(entry.password)
                    }
                    style={{
                      marginLeft: "8px",
                      cursor: "pointer",
                      border: "none",
                      background: "transparent",
                      fontSize: "16px",
                    }}
                  >
                    Copy
                  </button>

                </td>

                <td>
                  {entry.notes || "-"}
                </td>

                <td>

                  {entry.isShared ? (

                    entry.permission === "EDIT" ? (

                      <button
                        onClick={() =>
                          handleEdit(entry)
                        }
                      >
                        Edit
                      </button>

                    ) : (

                      <span className="view-only-label">
                        👁 View only
                      </span>

                    )

                  ) : (

                    <>
                      <button
                        onClick={() =>
                          handleEdit(entry)
                        }
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setSelectedEntry(entry);
                          setShareEmail("");
                          setSharePermission("VIEW");
                          setShowShareForm(true);
                        }}
                      >
                        Share
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(entry.id)
                        }
                      >
                        Delete
                      </button>
                    </>

                  )}

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Vault;