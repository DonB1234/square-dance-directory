import React, { useState } from "react";

interface ClubCardProps {
  club: {
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
    logo?: string;
  };
  stateColors: { [key: string]: string };
}

const ClubCard: React.FC<ClubCardProps> = ({ club, stateColors }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        border: `3px solid ${stateColors[club.state]}`,
        borderRadius: "12px",
        padding: "15px",
        backgroundColor: "#fff",
        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 3px 6px rgba(0,0,0,0.1)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        {club.logo && (
          <img
            src={club.logo}
            alt={club.name}
            style={{ width: "80px", height: "80px", borderRadius: "10px", marginRight: "15px" }}
          />
        )}
        <div style={{ flexGrow: 1 }}>
          <h2>{club.name}</h2>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              backgroundColor: stateColors[club.state],
              color: "#fff",
              padding: "6px 12px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "6px",
            }}
          >
            {expanded ? "Hide Details" : "View Details"}
          </button>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: "10px", textAlign: "left" }}>
          <p>
            <strong>City:</strong> {club.city}
          </p>
          <p>
            <strong>Location:</strong> {club.location}
          </p>
          <p>
            <strong>Night:</strong> {club.night}
          </p>
          <p>
            <strong>Caller/Cuer:</strong> {club.caller_cuer || "N/A"}
          </p>
          <p>
            <strong>Time:</strong> {club.time}
          </p>
          <p>
            <strong>Level:</strong> {club.level}
          </p>
          <p>
            <strong>Telephone:</strong> {club.telephone}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${club.email}`}>{club.email}</a>
          </p>
          {club.facebook && (
            <p>
              <strong>Facebook:</strong>{" "}
              <a href={club.facebook} target="_blank" rel="noreferrer">
                {club.facebook}
              </a>
            </p>
          )}
          {club.website && (
            <p>
              <strong>Website:</strong>{" "}
              <a href={club.website} target="_blank" rel="noreferrer">
                {club.website}
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ClubCard;
