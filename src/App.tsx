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
    id: "wa1",
    name: "Kerr-Ly-Qs",
    city: "Perth",
    state: "WA",
    location: "Community Hall, Perth",
    night: "Tuesday",
    caller_cuer: "Allen",
    time: "7-9pm",
    level: "Beginner/Intermediate",
    telephone: "0459 250 143",
    email: "Kerr.Ly.Qs@gmail.com",
    facebook: "https://facebook.com/kerrlyqs",
    website: "https://kerrlyqs.com.au",
    borderColor: "#F5C45C",
    logo: "",
  },
  {
    id: "wa2",
    name: "Kiwilers",
    city: "Perth",
    state: "WA",
    location: "Kiwi Hall, Perth",
    night: "Thursday",
    caller_cuer: "Alannah",
    time: "7-9pm",
    level: "All Levels",
    telephone: "04350 175 571",
    email: "kiwilers@example.com",
    facebook: "https://facebook.com/kiwilers",
    website: "https://kiwilers.com.au",
    borderColor: "#F5C45C",
    logo: "",
  },
  {
    id: "sa1",
    name: "Swan Valley Squares",
    city: "Adelaide",
    state: "SA",
    location: "Swan Hall, Adelaide",
    night: "Wednesday",
    caller_cuer: "Mark",
    time: "7-9pm",
    level: "Beginner",
    telephone: "0400 111 222",
    email: "swanvalley@example.com",
    facebook: "https://facebook.com/swanvalleysquares",
    website: "https://swanvalleysquares.com.au",
    borderColor: "#ED174C",
    logo: "",
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
  WA: "#000000",
  SA: "#E17000",
  VIC: "#C0C0C0",
  NSW: "#FF0000",
  QLD: "#00008B",
  ACT: "#012B88",
  TAS: "#006A4E",
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

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(search.toLowerCase()) ||
      club.city.toLowerCase().includes(search.toLowerCase()) ||
      club.state.toLowerCase().includes(search.toLowerCase()) ||
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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Australian Square Dance Clubs</h1>
      <p>© Don Barba 2025</p>

      {/* State Buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
          maxWidth: "360px",
          margin: "0 auto 20px",
        }}
      >
        {stateButtons.map((state) => {
          let colSpan = state === "ALL" ? 2 : 1; // last row has 2 columns
          return (
            <button
              key={state}
              style={{
                gridColumn: `span ${colSpan}`,
                backgroundColor: stateButtonColors[state],
                border: `2px solid ${stateButtonBorders[state]}`,
                color: "#fff",
                padding: "10px",
                cursor: "pointer",
                borderRadius: "5px",
                fontWeight: "bold",
                textAlign: "center",
                transition: "all 0.3s",
                boxShadow: selectedState === state ? "0 0 8px 2px #fff" : "none",
              }}
              onClick={() => setSelectedState(state)}
            >
              {state}
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
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

      {/* Clubs Grouped by State */}
      <div>
        {Object.keys(clubsByState).map((state) => (
          <div key={state} style={{ marginBottom: "40px" }}>
            <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "5px", textAlign: "center" }}>{state}</h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px",
                marginTop: "10px",
              }}
            >
              {clubsByState[state].map((club) => (
                <ClubCard key={club.id} club={club} isExpanded={!!expandedClubs[club.id]} toggleExpand={toggleExpand} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ClubCardProps {
  club: Club;
  isExpanded: boolean;
  toggleExpand: (id: string) => void;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, isExpanded, toggleExpand }) => {
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
        minWidth: "280px",
        maxWidth: "320px",
        flex: "1 1 300px",
        display: "flex",
        flexDirection: "column",
        wordWrap: "break-word",
        transition: "all 0.3s ease",
        position: "relative",
      }}
    >
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
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: "52px",
            transition: "all 0.2s ease",
          }}
          onClick={() => window.open(club.website || "#", "_blank")}
        >
          🔹
        </button>
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
