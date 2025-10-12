import React, { useState, useRef, useEffect } from "react";

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
  logo?: string;
  borderColor: string;
}

// --- SAMPLE DATA ---
const clubs: Club[] = [
  {
    id: "vic1",
    name: "Melbourne Squares",
    city: "Melbourne",
    state: "VIC",
    location: "Community Hall, Melbourne",
    night: "Tuesday",
    caller_cuer: "John Doe",
    time: "7-9pm",
    level: "Beginner/Intermediate",
    telephone: "0411 234 567",
    email: "melbsquares@example.com",
    facebook: "https://facebook.com/melbsquares",
    website: "https://melbsquares.com.au",
    borderColor: "#001F7E",
  },
  {
    id: "nsw1",
    name: "Sydney Swings",
    city: "Sydney",
    state: "NSW",
    location: "Sydney Dance Hall",
    night: "Wednesday",
    caller_cuer: "Jane Smith",
    time: "6-8pm",
    level: "All Levels",
    telephone: "0422 345 678",
    email: "sydneyswings@example.com",
    facebook: "https://facebook.com/sydneyswings",
    website: "https://sydneyswings.com.au",
    borderColor: "#CBEDFD",
  },
];

const stateButtonColors: { [key: string]: string } = {
  WA: "#F5C45C",
  SA: "#ED174C",
  NSW: "#CBEDFD",
  TAS: "#A10035",
  ACT: "#FFCE00",
  VIC: "#001F7E",
  QLD: "#7D0096",
  ALL: "#808080",
};

const stateButtonBorders: { [key: string]: string } = {
  WA: "#000000", // black
  SA: "#E17000", // gold
  VIC: "#C0C0C0", // silver
  NSW: "#FF0000", // red
  QLD: "#00008B", // blue
  ACT: "#012B88", // resolution blue
  TAS: "#006A4E", // bottle green
  ALL: "#000000",
};

const stateButtons = Object.keys(stateButtonColors);

const App: React.FC = () => {
  const [search, setSearch] = useState("");
  const [expandedClubs, setExpandedClubs] = useState<{ [key: string]: boolean }>({});
  const [selectedState, setSelectedState] = useState("ALL");

  const toggleExpand = (id: string) => {
    setExpandedClubs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter logic
  const filteredClubs = clubs.filter((club) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm) ||
      club.city.toLowerCase().includes(searchTerm) ||
      club.state.toLowerCase().includes(searchTerm) ||
      club.night.toLowerCase().includes(searchTerm) ||
      (club.caller_cuer && club.caller_cuer.toLowerCase().includes(searchTerm)) ||
      club.time.toLowerCase().includes(searchTerm);
    const matchesState = selectedState === "ALL" || club.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1>Australian Square Dance Clubs</h1>
      <p>© Don Barba 2025</p>

      {/* --- State Buttons with Glow --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          justifyItems: "center",
          maxWidth: "400px",
          margin: "0 auto 20px auto",
        }}
      >
        {stateButtons.map((state) => (
          <button
            key={state}
            style={{
              backgroundColor: stateButtonColors[state],
              border: `3px solid ${stateButtonBorders[state]}`,
              color: state === "NSW" ? "#000" : "#fff",
              padding: "10px 0",
              width: "100px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
              boxShadow:
                selectedState === state
                  ? `0 0 12px 3px ${stateButtonColors[state]}`
                  : "none",
              transform: selectedState === state ? "scale(1.05)" : "scale(1)",
              transition: "all 0.3s ease",
            }}
            onClick={() => setSelectedState(state)}
          >
            {state}
          </button>
        ))}
      </div>

      {/* --- Search Bar --- */}
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search by club, city, state, night, caller, or time..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "80%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* --- Club Cards --- */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginTop: "10px",
        }}
      >
        {filteredClubs.map((club) => (
          <AnimatedClubCard
            key={club.id}
            club={club}
            isExpanded={!!expandedClubs[club.id]}
            toggleExpand={toggleExpand}
          />
        ))}

        {filteredClubs.length === 0 && (
          <p style={{ fontStyle: "italic", color: "#666" }}>No clubs found.</p>
        )}
      </div>
    </div>
  );
};

interface ClubCardProps {
  club: Club;
  isExpanded: boolean;
  toggleExpand: (id: string) => void;
}

const AnimatedClubCard: React.FC<ClubCardProps> = ({ club, isExpanded, toggleExpand }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded]);

  return (
    <div
      style={{
        border: `4px solid ${club.borderColor}`,
        borderRadius: "10px",
        padding: "15px",
        backgroundColor: "#fff",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        transition: "all 0.3s ease",
        position: "relative",
      }}
    >
      {/* --- Club Header --- */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "18px", flex: 1 }}>{club.name}</h3>
        <button
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#808080",
            color: "#fff",
            cursor: "pointer",
            fontSize: "18px",
            lineHeight: "52px",
          }}
          onClick={() => window.open(club.website || "#", "_blank")}
          title="Visit Website"
        >
          🔗
        </button>
      </div>

      {/* --- View Details Button --- */}
      <button
        style={{
          marginBottom: "10px",
          padding: "8px 12px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: club.borderColor,
          color: "#fff",
          cursor: "pointer",
          fontSize: "14px",
        }}
        onClick={() => toggleExpand(club.id)}
      >
        {isExpanded ? "Hide Details" : "View Details"}
      </button>

      {/* --- Expandable Details --- */}
      <div
        ref={contentRef}
        style={{
          overflow: "hidden",
          maxHeight: `${height}px`,
          transition: "max-height 0.5s ease",
          fontSize: "14px",
          textAlign: "left",
        }}
      >
        <p><strong>State:</strong> {club.state}</p>
        <p><strong>City:</strong> {club.city}</p>
        <p><strong>Location:</strong> {club.location}</p>
        <p><strong>Night:</strong> {club.night}</p>
        {club.caller_cuer && <p><strong>Caller/Cuer:</strong> {club.caller_cuer}</p>}
        <p><strong>Time:</strong> {club.time}</p>
        <p><strong>Level:</strong> {club.level}</p>
        <p><strong>Telephone:</strong> {club.telephone}</p>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${club.email}`} style={{ color: club.borderColor }}>
            {club.email}
          </a>
        </p>
        <p>
          <strong>Facebook:</strong>{" "}
          <a href={club.facebook} target="_blank" rel="noopener noreferrer" style={{ color: club.borderColor }}>
            {club.facebook}
          </a>
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a href={club.website} target="_blank" rel="noopener noreferrer" style={{ color: club.borderColor }}>
            {club.website}
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
