import React, { useState } from "react";
import "./App.css";

interface Club {
  id: string;
  name: string;
  city: string;
  state: string;
  location: string;
  night: string;
  caller_cuer?: string;
  time: string;
  level: string;
  telephone: string;
  email: string;
  facebook: string;
  website: string;
}

const clubs: Club[] = [
  {
    id: "1",
    name: "Sunny Squares",
    city: "Perth",
    state: "WA",
    location: "Community Hall, Perth",
    night: "Wednesday",
    time: "7:30 PM",
    level: "Beginner",
    telephone: "123456789",
    email: "sunny@example.com",
    facebook: "https://facebook.com/sunny",
    website: "https://sunny.com",
  },
  {
    id: "2",
    name: "Happy Dancers",
    city: "Sydney",
    state: "NSW",
    location: "Town Hall, Sydney",
    night: "Friday",
    time: "8:00 PM",
    level: "Intermediate",
    telephone: "987654321",
    email: "happy@example.com",
    facebook: "https://facebook.com/happy",
    website: "https://happy.com",
  },
];

const states = Array.from(new Set(clubs.map((club) => club.state)));

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeState, setActiveState] = useState("");

  const filteredClubs = clubs.filter(
    (club) =>
      (!activeState || club.state === activeState) &&
      (club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleLogoSrc = (clubName: string) => {
    // Normalize name to match file naming: spaces to underscores
    const fileName = clubName.replace(/\s+/g, "_") + ".png";
    return `/logos/${fileName}`;
  };

  return (
    <div className="App">
      <h1>Square Dance Clubs</h1>

      {/* State Buttons */}
      <div className="state-buttons">
        {states.map((state) => (
          <button
            key={state}
            className={`state-btn ${activeState === state ? "active" : ""}`}
            onClick={() =>
              setActiveState(activeState === state ? "" : state)
            }
          >
            {state}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        className="search-input"
        placeholder="Search by club or city..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Clubs */}
      <div className="clubs-container">
        {filteredClubs.length === 0 ? (
          <div className="no-results">No clubs found.</div>
        ) : (
          filteredClubs.map((club) => (
            <div key={club.id} className="club-card">
              <div className="club-header">
                <div className="club-info">
                  <h2 className="club-name">{club.name}</h2>
                  <div className="club-sub">
                    {club.city}, {club.state} — {club.night} @ {club.time}
                  </div>
                  <div className="club-sub">{club.level}</div>
                </div>
                <div className="club-right">
                  <div className="state-badge">{club.state}</div>
                  <img
                    className="club-logo"
                    src={handleLogoSrc(club.name)}
                    alt={`${club.name} logo`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/60";
                    }}
                  />
                </div>
              </div>

              {/* Contact Links */}
              <div className="club-links">
                {club.website && (
                  <a href={club.website} target="_blank" rel="noreferrer">
                    Website
                  </a>
                )}
                {club.facebook && (
                  <a href={club.facebook} target="_blank" rel="noreferrer">
                    Facebook
                  </a>
                )}
                {club.email && <span>Email: {club.email}</span>}
                {club.telephone && <span>Tel: {club.telephone}</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
