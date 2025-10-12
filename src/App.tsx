// src/App.tsx
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
  logo?: string; // optional URL
  borderColor: string;
}

/**
 * Replace these example items with your full clubs array (all states).
 * Each club may include `logo` with a URL to show a real image.
 */
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
    logo: "https://via.placeholder.com/120?text=Melb+Logo", // example logo URL
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
    logo: "", // no logo => placeholder shown
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

// explicit order for 3-3-2: row1 (WA, SA, NSW), row2 (TAS, ACT, VIC), row3 (QLD, ALL)
const orderedStateRows = [
  ["WA", "SA", "NSW"],
  ["TAS", "ACT", "VIC"],
  ["QLD", "ALL"],
];

const App: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [expandedClubs, setExpandedClubs] = useState<{ [key: string]: boolean }>({});
  const [selectedState, setSelectedState] = useState<string>("ALL");
  const [fadeKey, setFadeKey] = useState<number>(0);

  // Toggle expand/collapse of one club card
  const toggleExpand = (id: string) => {
    setExpandedClubs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle state filter: click selected -> clear to ALL, otherwise set state
  const toggleState = (state: string) => {
    setSelectedState((prev) => (prev === state ? "ALL" : state));
  };

  // filter logic: search (name, city, state, night, caller, time) and selectedState
  const filteredClubs = clubs.filter((club) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      club.name.toLowerCase().includes(q) ||
      club.city.toLowerCase().includes(q) ||
      club.state.toLowerCase().includes(q) ||
      club.night.toLowerCase().includes(q) ||
      (club.caller_cuer && club.caller_cuer.toLowerCase().includes(q)) ||
      club.time.toLowerCase().includes(q);
    const matchesState = selectedState === "ALL" || club.state === selectedState;
    return matchesSearch && matchesState;
  });

  // group clubs by state for display
  const clubsByState: { [state: string]: Club[] } = {};
  filteredClubs.forEach((c) => {
    if (!clubsByState[c.state]) clubsByState[c.state] = [];
    clubsByState[c.state].push(c);
  });

  // fade animation trigger when filteredClubs changes
  useEffect(() => {
    setFadeKey((k) => k + 1);
  }, [filteredClubs.length, selectedState, search]);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", background: "#f7f9fb", minHeight: "100vh" }}>
      {/* small embedded CSS for responsiveness/hovers */}
      <style>{`
        .state-row { display:flex; gap:12px; justify-content:center; margin-bottom:10px; flex-wrap:wrap; }
        .state-btn { cursor:pointer; border-radius:8px; padding:10px 14px; min-width:110px; font-weight:700; text-align:center; outline:none; transition:transform .12s, box-shadow .12s; }
        .state-btn.active { box-shadow: 0 6px 18px rgba(0,0,0,0.12); transform: translateY(-3px); }
        @media (max-width:720px){ .state-btn{ min-width: 96px; padding:8px 10px; } }
        .club-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px; }
        .club-card { background:#fff; border-radius:12px; padding:16px; box-shadow:0 6px 18px rgba(18,38,63,0.06); display:flex; flex-direction:column; min-height:260px;}
        .logo-circle { width:60px; height:60px; border-radius:50%; background:#808080; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; cursor:pointer; overflow:hidden; flex-shrink:0; }
        .logo-circle img { width:100%; height:100%; object-fit:cover; display:block; }
        .view-btn { padding:8px 12px; border-radius:8px; border:none; color:#fff; font-weight:700; cursor:pointer; }
        .muted { color:#666; font-size:14px; }
      `}</style>

      <header style={{ maxWidth: 960, margin: "0 auto 18px", textAlign: "center" }}>
        <h1 style={{ margin: 0 }}>Australian Square Dance Clubs</h1>
        <div style={{ marginTop: 6, color: "#666" }}>© Don Barba 2025</div>
      </header>

      {/* State buttons laid out as 3-3-2 rows */}
      <div style={{ maxWidth: 600, margin: "12px auto 22px" }}>
        {orderedStateRows.map((row, rowIdx) => (
          <div key={rowIdx} className="state-row" role="group" aria-label={`States row ${rowIdx + 1}`}>
            {row.map((st) => {
              const isActive = selectedState === st;
              return (
                <button
                  key={st}
                  className={`state-btn ${isActive ? "active" : ""}`}
                  onClick={() => toggleState(st)}
                  aria-pressed={isActive}
                  style={{
                    background: stateButtonColors[st],
                    border: `2px solid ${stateButtonBorders[st] || "#000"}`,
                    color: st === "NSW" ? "#000" : "#fff",
                    boxSizing: "border-box",
                    width: row.length === 2 ? 140 : 120, // slightly larger for 2-item row
                  }}
                >
                  {st}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ maxWidth: 900, margin: "0 auto 26px", textAlign: "center" }}>
        <input
          type="text"
          aria-label="Search clubs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by club name, city, state, night, caller/cuer or time..."
          style={{
            width: "92%",
            maxWidth: 760,
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid #d0d7df",
            fontSize: 16,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        />
      </div>

      {/* Club list grouped by state (fades when updated) */}
      <main style={{ maxWidth: 1100, margin: "0 auto 40px" }}>
        <div key={fadeKey} style={{ transition: "opacity .35s", opacity: 1 }}>
          {Object.keys(clubsByState).length === 0 ? (
            <div style={{ textAlign: "center", color: "#666", padding: 24 }}>No clubs match your search/filter.</div>
          ) : (
            Object.keys(clubsByState).map((st) => (
              <section key={st} style={{ marginBottom: 34 }}>
                <h2 style={{ margin: "0 0 12px 0", fontSize: 18 }}>{st}</h2>
                <div className="club-grid">
                  {clubsByState[st].map((club) => (
                    <ClubCard key={club.id} club={club} isExpanded={!!expandedClubs[club.id]} toggleExpand={toggleExpand} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

function ClubCard({ club, isExpanded, toggleExpand }: { club: Club; isExpanded: boolean; toggleExpand: (id: string) => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [maxH, setMaxH] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) return;
    // when expanded, measure content; otherwise collapse to 0
    const el = ref.current;
    setMaxH(isExpanded ? el.scrollHeight : 0);
  }, [isExpanded]);

  return (
    <article
      className="club-card"
      style={{
        border: `3px solid ${club.borderColor}`,
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 6px 0", fontSize: 18 }}>{club.name}</h3>
          <div className="muted">{club.city} • {club.night}</div>
        </div>

        {/* circular logo button (shows logo image if provided) */}
        <div
          className="logo-circle"
          role="button"
          title={club.name}
          onClick={() => {
            // open website if available
            if (club.website) window.open(club.website, "_blank");
          }}
          aria-label={`Open website for ${club.name}`}
          style={{ border: "2px solid rgba(0,0,0,0.06)" }}
        >
          {club.logo ? (
            <img src={club.logo} alt={`${club.name} logo`} />
          ) : (
            <span style={{ fontSize: 22 }}>📷</span>
          )}
        </div>
      </div>

      {/* View Details button under the title */}
      <div style={{ marginTop: 12 }}>
        <button
          className="view-btn"
          onClick={() => toggleExpand(club.id)}
          style={{ background: club.borderColor }}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Hide Details" : "View Details"}
        </button>
      </div>

      {/* Expandable details (smooth height transition) */}
      <div
        ref={ref}
        style={{
          overflow: "hidden",
          maxHeight: maxH,
          transition: "max-height 0.45s ease",
          marginTop: 12,
        }}
      >
        <div style={{ lineHeight: 1.45 }}>
          <p style={{ margin: "6px 0" }}><strong>State:</strong> {club.state}</p>
          <p style={{ margin: "6px 0" }}><strong>City:</strong> {club.city}</p>
          <p style={{ margin: "6px 0" }}><strong>Location:</strong> {club.location}</p>
          <p style={{ margin: "6px 0" }}><strong>Night:</strong> {club.night}</p>
          {club.caller_cuer && <p style={{ margin: "6px 0" }}><strong>Caller/Cuer:</strong> {club.caller_cuer}</p>}
          <p style={{ margin: "6px 0" }}><strong>Time:</strong> {club.time}</p>
          <p style={{ margin: "6px 0" }}><strong>Level:</strong> {club.level}</p>
          <p style={{ margin: "6px 0" }}><strong>Telephone:</strong> {club.telephone}</p>
          {club.email && <p style={{ margin: "6px 0" }}><strong>Email:</strong> <a href={`mailto:${club.email}`}>{club.email}</a></p>}
          {club.facebook && <p style={{ margin: "6px 0" }}><strong>Facebook:</strong> <a href={club.facebook} target="_blank" rel="noreferrer">{club.facebook}</a></p>}
          {club.website && <p style={{ margin: "6px 0" }}><strong>Website:</strong> <a href={club.website} target="_blank" rel="noreferrer">{club.website}</a></p>}
        </div>
      </div>
    </article>
  );
}

export default App;
