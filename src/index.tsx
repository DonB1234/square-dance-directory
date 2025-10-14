import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Simple Password Gate
const PasswordGate: React.FC<{ password: string }> = ({ password }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");

  // If previously unlocked, skip login
  useEffect(() => {
    if (localStorage.getItem("unlocked") === "true") {
      setUnlocked(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === password) {
      localStorage.setItem("unlocked", "true");
      setUnlocked(true);
    } else {
      alert("❌ Incorrect password. Try again!");
      setInput("");
    }
  };

  if (unlocked) return <App />;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e9ecef",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          textAlign: "center",
          width: "320px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>🔒 Enter Password</h2>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "15px",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Unlock
        </button>
        <p style={{ fontSize: "12px", color: "#888", marginTop: "10px" }}>
          (Password protection is for privacy only.)
        </p>
      </form>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <PasswordGate password="Aussie#1" />
  </React.StrictMode>
);

reportWebVitals();
