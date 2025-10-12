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
    borderColor: "#FF5733",
    logo: "",
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
    borderColor: "#33C3FF",
    logo: "",
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
    borderColor: "#33C3FF",
    logo: "",
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
    borderColor: "#33C3FF",
    logo: "",
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
    borderColor: "#33C3FF",
    logo: "",
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
    borderColor: "#33C3FF",
    logo: "",
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
    borderColor: "#33C3FF",
    logo: "",
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
    borderColor: "#33C3FF",
    logo: "",
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
    borderColor: "#33C3FF",
    logo: "",
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
    borderColor: "#33C3FF",
    logo: "",
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
    borderColor: "#33C3FF",
    logo: "",
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
    borderColor: "#33C3FF",
    logo: "",
  },
];

const stateButtons = [
  { name: "WA", bgColor: "#0078D7", borderColor: "#005A9E" },
  { name: "SA", bgColor: "#FFB900", borderColor: "#CC8B00" },
  { name: "QLD", bgColor: "#33FF57", borderColor: "#28A745" },
  { name: "VIC", bgColor: "#FF5733", borderColor: "#C43C1C" },
  { name: "TAS", bgColor: "#8E44AD", borderColor: "#6C3483" },
  { name: "NSW", bgColor: "#33C3FF", borderColor: "#1A9EDC" },
  { name: "ACT", bgColor: "#F39C12", borderColor: "#D68910" },
  { name: "ALL", bgColor: "#CCCCCC", borderColor: "#999999" },
];

const App: React.FC = () => {
  const [search, setSearch] = useState("");
  const [expandedClubs, setExpandedClubs] = useState<{ [key: string]: boolean }>({});
  const [selectedState, setSelectedState] = useState("ALL");

  const toggleExpand = (id: string) => {
    setExpandedClubs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(search.toLowerCase()) ||
      club.city.toLowerCase().includes(search.toLowerCase()) ||
      club.night.toLowerCase().includes(search.toLowerCase()) ||
      (club.caller_cuer && club.caller_cuer.toLowerCase().includes(search.toLowerCase())) ||
      club.time.toLowerCase().includes(search.toLowerCase());
    const matchesState = selectedState === "ALL" || club.state === selectedState;
    return matchesSearch && matchesState;
  });

  const clubsByState: { [state: string]: Club[] } = {};
  filteredClubs.forEach((club) => {
    if (!clubsByState[club.state]) clubsByState[club.state] = [];
    clubsByState[club.state].push(club);
  });

  const stateButtonRows = [
    stateButtons.slice(0, 3),
    stateButtons.slice(3, 6),
    stateButtons.slice(6, 8),
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Australian Square Dance Clubs</h1>
      <p>© Don Barba 2025</p>

      {/* State Buttons */}
      {stateButtonRows.map((row, idx) => (
        <div
          key={idx}
          style={{ display: "flex", justifyContent: "center", marginBottom: "10px", gap: "10px", flexWrap: "wrap" }}
        >
          {row.map((state) => (
            <button
              key={state.name}
              style={{
                backgroundColor: state.bgColor,
                border: `2px solid ${state.borderColor}`,
                color: "#fff",
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              onClick={() => setSelectedState(state.name)}
            >
              {state.name}
            </button>
          ))}
        </div>
      ))}

      {/* Search Bar */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search by state, night, caller/cuer, city, club or time..."
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

      {/* Clubs Grouped by State */}
      {Object.keys(clubsByState).map((state) => (
        <div key={state} style={{ marginBottom: "40px" }}>
          <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "5px" }}>{state}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            {clubsByState[state].map((club) => (
              <AnimatedClubCard key={club.id} club={club} isExpanded={!!expandedClubs[club.id]} toggleExpand={toggleExpand} />
            ))}
          </div>
        </div>
      ))}
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        wordWrap: "break-word",
        minHeight: "250px",
        position: "relative",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "18px", flex: 1 }}>{club.name}</h3>
        {club.logo && (
          <button
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: club.borderColor,
              color: "#fff",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
              lineHeight: "30px",
            }}
            onClick={() => window.open(club.website || "#", "_blank")}
          >
            🔹
          </button>
        )}
      </div>

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

      <div
        ref={contentRef}
        style={{
          overflow: "hidden",
          maxHeight: `${height}px`,
          transition: "max-height 0.5s ease",
          fontSize: "14px",
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
        <p><strong>Email:</strong> <a href={`mailto:${club.email}`}>{club.email}</a></p>
        <p><strong>Facebook:</strong> <a href={club.facebook} target="_blank" rel="noopener noreferrer">{club.facebook}</a></p>
        <p><strong>Website:</strong> <a href={club.website} target="_blank" rel="noopener noreferrer">{club.website}</a></p>
      </div>
    </div>
  );
};

export default App;
