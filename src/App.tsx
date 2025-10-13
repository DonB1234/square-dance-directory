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
    borderColor: "#F5C45C",
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
    borderColor: "#F5C45C",
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
    borderColor: "#F5C45C",
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
    borderColor: "#F5C45C",
    logo: "",
  },
  {
    id: "WA-007",
    name: "Greenfinches",
    city: "Hamersley",
    state: "WA",
    location: "Hamersley Recreation Centre, 20 Belvedere Road, Hamersley",
    night: "Tuesday",
    caller_cuer: "Steve Turner, Greg Fawell, Jim Buckingham",
    time: "8:00pm",
    level: "Mainstream / Rounds / Plus",
    telephone: "+61 419 900 441",
    email: "longwood@iinet.net.au",
    facebook: "https://www.facebook.com/groups/greenfinches",
    website: "",
    borderColor: "#F5C45C",
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
    borderColor: "#F5C45C",
    logo: "",
  },
   {
    id: "WA-009",
    name: "Dolphin Dancers",
    city: "Mandurah",
    state: "WA",
    location: "Mandurah Bowling Club, 89 Allnut Street, Mandurah",
    night: "Wednesday (daytime sessions listed)",
    caller_cuer: "Natlie Scott/Paul Long",
    time: "1:15pm – 3:15pm",
    level: "Mainstream",
    telephone: "+61 411 449 344",
    email: "dolphin.dancers@outlook.com",
    facebook: "https://www.facebook.com/dolphinsquaredancers",
    website: "",
    borderColor: "#F5C45C",
    logo: "",
  },
   {
    id: "WA-0010",
    name: "Dianella Rangers",
    city: "Joondanna",
    state: "WA",
    location: "St Peter and Emmaus Church Hall, 56 Green Street, Joondanna",
    night: "Tuesday - Beginners/ Wednesday - Mainstream",
    caller_cuer: "Kevin Fitzgerald Cuer- Marilyn Van Sambeeck",
    time: "7:30pm",
    level: "Mainstream and Rounds",
    telephone: "+61 8 9302 4779",
    email: "",
    facebook: "https://www.facebook.com/dianellarangerssdc",
    website: "https://www.dianellarangerssdc.com/",
    borderColor: "#F5C45C",
    logo: "",
  },
   {
    id: "WA-0011",
    name: "Jay Gees Squares",
    city: "Bunbury",
    state: "WA",
    location: "St Augustine’s Uniting Church Hall, 119 Mangles Street, Bunbury",
    night: "Wednesday",
    caller_cuer: "Jeff Garbutt",
    time: "7:30pm-9:30pm",
    level: "Mainstream",
    telephone: "+61 427 935 674",
    email: "jeffgarbutt@gmail.com",
    facebook: "https://www.facebook.com/JayGeesSquares/about/",
    website: " https://jeffgarbutt.wixsite.com/jaygees",
    borderColor: "#F5C45C",
    logo: "",
  },
   {
    id: "WA-0012",
    name: "JoKing Cloggers",
    city: "High Wycombe / Gosnells",
    state: "WA",
    location: "Cyril Road Community Centre (Thu) / Gosnells RSL (Sat)",
    night: "Thursday & Saturday",
    caller_cuer: "",
    time: "7:00-9:oopm -(Thur), 10:30am–12:00pm (Sat)",
    level: "Clogging – all levels",
    telephone: "+61 417 943 640 / +61 421 589 501",
    email: "jokingcloggerswa@gmail.com",
    facebook: "",
    website: "",
    borderColor: "#F5C45C",
    logo: "",
  },
   {
    id: "WA-0013",
    name: "Allemander Squares",
    city: "Currambine",
    state: "WA",
    location: "Currambine Community Centre, 64 Delamere Avenue, Currambine",
    night: "Thursday",
    caller_cuer: "Jim Buckingham",
    time: "7:00-9:00pm",
    level: "Beginners / Mainstream / Plus (if enough dancers)",
    telephone: "+61 418 948 823",
    email: "jimsgr8trax2@gmail.com",
    facebook: "",
    website: "",
    borderColor: "#F5C45C",
    logo: "",
  },
   {
    id: "WA-0014",
    name: "White Gum Valley Squares",
    city: "Rossmoyne ",
    state: "WA",
    location: "Rossmoyne Bowling Club, 35 Tuscon Street, Rossmoyne",
    night: "Thursday",
    caller_cuer: "",
    time: "7:45pm",
    level: "Mainstream and Rounds",
    telephone: "+61 478 559 554",
    email: "wgvsquares@gmail.com",
    facebook: "https://www.facebook.com/profile.php?id=100066477955147",
    website: "",
    borderColor: "#F5C45C",
    logo: "",
  },
  {
    id: "WA-0015",
    name: "Happy Wanderers",
    city: "High Wycombe",
    state: "WA",
    location: "Cyril Road Community Centre, 58 Cyril Road, High Wycombe",
    night: "Friday",
    caller_cuer: "Kevin Kelly",
    time: "7:45pm",
    level: "7:00pm (Plus) / 8:00pm (Mainstream)",
    telephone: "+61 427 161 159",
    email: "happywandererssdc@gmail.com",
    facebook: "https://www.facebook.com/groups/1279808272116694",
    website: "",
    borderColor: "#F5C45C",
    logo: "",
  },
   {
    id: "WA-0016",
    name: "Swan Valley Squares",
    city: "Dayton",
    state: "WA",
    location: "Dayton Community Centre, 211 Arthur Street, Dayton",
    night: "Friday",
    caller_cuer: "Greg Fawell",
    time: "7:30pm",
    level: "Plus/Mainstream",
    telephone: "+61 417 912 241",
    email: "",
    facebook: "https://www.facebook.com/groups/456272654473495/",
    website: "https://swanvalleysquares.weebly.com/",
    borderColor: "#F5C45C",
    logo: "",
  },
   {
    id: "WA-0017",
    name: "Gidgegannup Square Dance Club",
    city: "Gidgegannup",
    state: "WA",
    location: "Gidgegannup Showgrounds Hall, Old Toodyay Road, Gidgegannup",
    night: "2nd & 4th Saturday",
    caller_cuer: "",
    time: "8:00pmpm",
    level: "Mainstream",
    telephone: "+61 417 092 309",
    email: "",
    facebook: "https://www.facebook.com/groups/581177512415769",
    website: "",
    borderColor: "#F5C45C",
    logo: "",
  },
  {
    id: "WA-0018",
    name: "P & R Rounds",
    city: "Bassendean",
    state: "WA",
    location: "Bassendean RSL Hall / local seniors centre",
    night: "Saturday",
    caller_cuer: "",
    time: "12:00pm (Seniors) / 1:00pm (Intermediate) / 2:00pm (Beginners",
    level: "Rounds / Intermediate / Beginners",
    telephone: "+61 418 926 202",
    email: "",
    facebook: "",
    website: "",
    borderColor: "#F5C45C",
    logo: "",
  },
   {
    id: "QLD-001",
    name: "Suncoasters Square Dance Club",
    city: "Buderim",
    state: "QLD",
    location: "Sunshine Coast Square Dance Centre, Buderim, 260 Dixon Road",
    night: "1st, 3rd & 5th Saturdays",
    caller_cuer: "",
    time: "12:00pm (Seniors) / 1:00pm (Intermediate) / 2:00pm (Beginners",
    level: "Basics to A",
    telephone: "+61 418 926 202",
    email: "",
    facebook: "https://www.facebook.com/Suncoasters",
    website: " https://www.suncoasters.com.au/",
    borderColor: "#7D0096",
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
