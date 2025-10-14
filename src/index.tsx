import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const PasswordGate: React.FC<{ password: string; children: React.ReactNode }> = ({
  password,
  children,
}) => {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");

  // Check if previously unlocked
  useEffect(() => {
    const saved = localStorage.getItem("site_unlocked");
    if (saved === "1") setUnlocked(true);
  }, []);

  const tryUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === password) {
      localStorage.setItem("site_unlocked", "1");
      setUnlocked(true);
    } else {
      alert("Incorrect password. Try again!");
      setInput("");
    }
  };

  if (unlocked) {
    return <>{children}</>;
  }

  // Password screen
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f0f0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={tryUnlock}
        style={{
          width: 320,
          background: "white",
          padding: 24,
          borderRadius: 10,
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginTop: 0 }}>🔒 Enter Password</h2>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password"
          style={{
            width: "100%",
            padding: "10px 12px",
            margin: "12px 0",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 6,
            border: "none",
            background: "#007bff",
            color: "white",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Unlock
        </button>
        <p style={{ fontSize: 12, color: "#888", marginTop: 10 }}>
          (Password protection is for privacy only — not full security.)
        </p>
      </form>
    </div>
  );
};

// Normal rendering, just wrapped in password gate
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <PasswordGate password="Aussie#1">
      <App />
    </PasswordGate>
  </React.StrictMode>
);

reportWebVitals();
