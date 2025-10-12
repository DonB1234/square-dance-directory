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
    id: "Wa-001",
    name: "Kiwilers",
    city: "South Perth",
    state: "WA",
    location: "Community Hall, Perth",
    night: "Friday-Maintream, Monday-Plus, Tueday-Advanced",
    caller_cuer: "Richard Muir",
    time: "7:30-9:30pm",
    level: "Mainstream-Friday, Plus-Monday, Advanced-Tuesday",
    telephone: "0459 250 143",
    email: "kiwilerssdc@gmail.com",
    facebook: "https://www.facebook.com/Kiwilers",
    website: "https://kiwilerssquaredance.wixsite.com/",
    borderColor: "#F5C45C",
    logo: "",
  },
  {
    id: "WA-002",
    name: "Cloverwest",
    city: "Shenton Park",
    state: "WA",
    location: "Shenton Park Community Centre, 240 Onslow Road, Shenton Park",
    night: "Monday",
    caller_cuer: "Kevin Fitzgerald",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "+61 413 156 192",
    email: "fitz27@bigpond.com",
    facebook: "https://facebook.com/kerrlyqs",
    website: "https://www.facebook.com/cloverwest.square.dance/about/",
    borderColor: "#F5C45C",
    logo: "",
  },
  {
    id: "WA-003",
    name: "Bunbury Square Dancers",
    city: "Eaton / Bunbury",
    state: "WA",
    location: "Eaton Family Centre, 4 Charterhouse Street, Eaton",
    night: "Monday",
    caller_cuer: "",
    time: "7-9pm",
    level: "Mainstream & Learning Plus",
    telephone: "04350 175 571",
    email: "",
    facebook: "",
    website: "",
    borderColor: "#000000",
    logo: "",
  },
  {
    id: "WA-004",
    name: "Northern Stars",
    city: "Muchea",
    state: "WA",
    location: "Muchea Recreation Centre, 48 Archibald Street, Muchea",
    night: "Monday",
    caller_cuer: "Mp3 club",
    time: "7:30pm",
    level: "SSD & Mainstream",
    telephone: "+61 407 389 948",
    email: "northernstars.squaredance@outlook.com",
    facebook: "",
    website: "",
    borderColor: "#000000",
    logo: "",
  },
  
  {
    id: "WA-005",
    name: "Riverside",
    city: "Bentley",
    state: "WA",
    location: "Bentley Community Centre / Bentley Hub, Nyamup Way, Bentley",
    night: "Monday",
    caller_cuer: "Mainstream",
    time: "8:00pm",
    level: "SSD & Mainstream",
    telephone: "+61 419 563 375",
    email: "",
    facebook: "",
    website: "",
    borderColor: "#000000",
    logo: "",
  },
  {
    id: "WA-006",
    name: "Wheatbelt Squares",
    city: "Goomalling",
    state: "WA",
    location: "Goomalling Senior Citizens Centre, Cnr Quinlan & Lockyer Street, Goomalling",
    night: "Alternate Monday",
    caller_cuer: "Robert Dew",
    time: "8:00pm",
    level: "Mainstream",
    telephone: "+61 419 563 375",
    email: "",
    facebook: "",
    website: "",
    borderColor: "#000000",
    logo: "",
  },
  {
    id: "WA-007",
    name: "Greenfinches",
    city: "Hamersley",
    state: "WA",
    location: "Hamersley Recreation Centre, 20 Belvedere Road, Hamersley",
    night: "Tuesday",
    caller_cuer: "Robert DewSteve Turner, Greg Fawell, Jim Buckingham",
    time: "8:00pm",
    level: "Mainstream / Rounds / Plus",
    telephone: "+61 419 900 441",
    email: "longwood@iinet.net.au",
    facebook: "https://www.facebook.com/groups/greenfinches",
    website: "",
    borderColor: "#000000",
    logo: "",
  },
    {
    id: "WA-008",
    name: "Ups 'N' Downers",
    city: "Gosnells",
    state: "WA",
    location: "All Saints Anglican Church Hall, Cnr Hicks & Dorothy Street, Gosnells",
    night: "Tuesday",
    caller_cuer: "Keith Lethbridge",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "+61 407 442 957",
    email: "",
    facebook: "",
    website: "",
    borderColor: "#000000",
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
