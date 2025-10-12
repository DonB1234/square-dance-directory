import React, { useState } from "react";
import "./App.css";

interface Club {
  name: string;
  state: string;
  city: string;
  caller: string;
  day: string;
  time: string;
  venue: string;
  contact: string;
  borderColor: string;
  logo?: string;
}

const clubs: Club[] = [
  {
    name: "Kerr-Ly-Qs Square Dance Club",
    state: "WA",
    city: "Perth",
    caller: "Allen",
    day: "Tuesday",
    time: "7:30 PM - 10:00 PM",
    venue: "Community Hall",
    contact: "Allen: 0459 250 143 / Alannah: 04350 175 571",
    borderColor: "#FF5733",
    logo: "",
  },
  {
    name: "Melbourne Movers",
    state: "VIC",
    city: "Melbourne",
    caller: "Sarah",
    day: "Thursday",
    time: "6:30 PM - 9:30 PM",
    venue: "Town Hall",
    contact: "sarah@example.com",
    borderColor: "#33B5FF",
  },
  // Add other clubs here...
];

const stateGradients: { [key: string]: string } = {
  WA: "linear-gradient(135deg, #e0f7fa, #b2ebf2)",
  SA: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
  QLD: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
  VIC: "linear-gradient(135deg, #f3e5f5, #e1bee7)",
  TAS: "linear-gradient(135deg, #fffde7, #fff9c4)",
  NSW: "linear-gradient(135deg, #fbe9e7, #ffccbc)",
  ACT: "linear-gradient(135deg, #e0f2f1, #b2dfdb)",
  ALL: "linear-gradient(135deg, #eceff1, #cfd8dc)",
};

const states = ["WA", "SA", "QLD", "VIC", "TAS", "NSW", "ACT", "ALL"];

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("ALL");
  const [openDetails, setOpenDetails] = useState<number | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStateClick = (state: string) => {
    setSelectedState(state);
  };

  const toggleDetails = (index: number) => {
    setOpenDetails(openDetails === index ? null : index);
  };

  const filteredClubs = clubs.filter((club) => {
    const matchesState = selectedState === "ALL" || club.state === selectedState;
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.caller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.time.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Australian Square Dance Clubs</h1>
      <p>© Don Barba 2025</p>

      {/* State Buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {states.map((state) => (
          <button
            key={state}
            onClick={() => handleStateClick(state)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: selectedState === state ? "#1976d2" : "#eee",
              color: selectedState === state ? "#fff" : "#000",
              border: "1px solid #ccc",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {state}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by state, day, caller, city or time..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Clubs Section */}
      {states
        .filter((state) => state !== "ALL")
        .map((state) => {
          const clubsInState = filteredClubs.filter(
            (club) => club.state === state
          );
          if (clubsInState.length === 0) return null;

          return (
            <div
              key={state}
              style={{
                background: stateGradients[state],
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <h2>{state}</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "15px",
                }}
              >
                {clubsInState.map((club, index) => (
                  <div
                    key={index}
                    style={{
                      border: `2px solid ${club.borderColor}`,
                      borderRadius: "10px",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "auto",
                      wordWrap: "break-word",
                    }}
                  >
                    {club.logo && (
                      <img
                        src={club.logo}
                        alt={`${club.name} logo`}
                        style={{ width: "100%", borderRadius: "5px", marginBottom: "10px" }}
                      />
                    )}
                    <h3>{club.name}</h3>
                    <p>
                      {club.city} | {club.day} | {club.time}
                    </p>
                    <button
                      onClick={() => toggleDetails(index)}
                      style={{
                        marginTop: "10px",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: club.borderColor,
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      {openDetails === index ? "Hide Details" : "View Details"}
                    </button>

                    {openDetails === index && (
                      <div style={{ marginTop: "10px" }}>
                        <p>
                          <strong>Caller:</strong> {club.caller}
                        </p>
                        <p>
                          <strong>Venue:</strong> {club.venue}
                        </p>
                        <p>
                          <strong>Contact:</strong> {club.contact}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default App;
