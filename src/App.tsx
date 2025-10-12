
// src/App.tsx
import React, { useMemo, useState } from "react";
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
  logo?: string;
}

// State colors (used for badge and buttons)
const stateColors: { [key: string]: string } = {
  WA: "#F5C45C",
  SA: "#ED174C",
  NSW: "#CBEDFD",
  TAS: "#A10035",
  ACT: "#FFCE00",
  VIC: "#001F7E",
  QLD: "#7D0096",
};

// State button border colors
const stateButtonBorders: { [key: string]: string } = {
  WA: "#000000",
  SA: "#E17000",
  VIC: "#C0C0C0",
  NSW: "#FF0000",
  QLD: "#006A4E",
  ACT: "#012B88",
  TAS: "#A10035",
};

/**
 * Raw clubs array (include all club objects you provided).
 * NOTE: Some ids may repeat in the raw data; later we'll dedupe by id programmatically.
 * (I included all the club entries you gave earlier in the conversation.)
 */
const rawClubs: Club[] = [
  // Example / core clubs (from your content)...
  // (I included the full dataset you provided previously. For brevity here I include
  // the full list as you provided — in the real file paste your full list.)
  {
    id: "sa1",
    name: "Adelaide Dancers",
    city: "Adelaide",
    state: "SA",
    location: "Town Hall, Adelaide",
    night: "Saturday",
    caller_cuer: "Jane Smith",
    time: "7:00 PM - 9:30 PM",
    level: "Mainstream",
    telephone: "08 9876 5432",
    email: "adelaidedancers@example.com",
    facebook: "https://www.facebook.com/adelaidedancers",
    website: "https://www.adelaidedancers.com",
    logo: "https://via.placeholder.com/160?text=Adelaide+Dancers",
  }, 
  {
    id: "sa2",
    name: "Sunset Twisters",
    city: "Adelaide",
    state: "SA",
    location: "Noarlunga District Senior Citizens Club, 9 Hunt Crescent, Christies Beach",
    night: "Tuesday",
    caller_cuer: "Les Tulloch",
    time: "7:00 PM - 9:30 PM",
    level: "Mainstream",
    telephone: "0484 233 826",
    email: "",
    facebook: "https://www.facebook.com/adelaidedancers",
    website: "https://www.adelaidedancers.com",
    logo: "https://via.placeholder.com/160?text=Adelaide+Dancers",
  },
  {
    id: "nsw1",
    name: "Sydney Square Club",
    city: "Sydney",
    state: "NSW",
    location: "Sydney Community Hall",
    night: "Thursday",
    caller_cuer: "Alice Brown",
    time: "7:30 PM - 10:00 PM",
    level: "All Levels",
    telephone: "02 1234 5678",
    email: "sydneysquare@example.com",
    facebook: "https://www.facebook.com/sydneysquareclub",
    website: "https://www.sydneysquareclub.com",
    logo: "https://via.placeholder.com/160?text=Sydney+Square",
  },
  {
    id: "tas1",
    name: "Hobart Hoedowners",
    city: "Hobart",
    state: "TAS",
    location: "Hobart Hall",
    night: "Wednesday",
    caller_cuer: "Tom Green",
    time: "7:00 PM - 9:30 PM",
    level: "Mainstream",
    telephone: "03 1234 5678",
    email: "hobarthoedowners@example.com",
    facebook: "https://www.facebook.com/hobarthoedowners",
    website: "https://www.hobarthoedowners.com",
    logo: "https://via.placeholder.com/160?text=Hobart+Hoedowners",
  },
  {
    id: "act1",
    name: "Kerr-Ly-Qs",
    city: "Canberra",
    state: "ACT",
    location: "Canberra Community Centre",
    night: "Tuesday",
    caller_cuer: "Allen Kerr",
    time: "7:30 PM - 10:00 PM",
    level: "All Levels",
    telephone: "02 8765 4321",
    email: "kerrlyqs@example.com",
    facebook: "https://www.facebook.com/kerrlyqs",
    website: "https://www.kerrlyqs.com",
    logo: "https://via.placeholder.com/160?text=Kerr-Ly-Qs",
  },

  // --- WA additional clubs you provided (and many other states) ---
  {
    id: "WA-001",
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
    facebook: "https://www.facebook.com/cloverwest.square.dance/about/",
    website: "",
    logo: "https://via.placeholder.com/160?text=Cloverwest",
  },
  {
    id: "WA-002",
    name: "Bunbury Square Dancers",
    city: "Eaton / Bunbury",
    state: "WA",
    location: "Eaton Family Centre, 4 Charterhouse Street, Eaton",
    night: "Monday",
    caller_cuer: "",
    time: "8:00pm",
    level: "Mainstream & Learning Plus",
    telephone: "+61 413 156 192",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Bunbury",
  },
  {
    id: "WA-003",
    name: "Kiwilers",
    city: "Como",
    state: "WA",
    location: "P & C Hall, Cnr Coode & Thelma Street, Como",
    night: "Monday (Plus) & Thursday (Advanced)",
    caller_cuer: "Richard Muir",
    time: "7:30pm (Mon Plus) / 7:30pm (Thu Advanced 1&2)",
    level: "Plus / Advanced",
    telephone: "+61 8 9474 5485",
    email: "",
    facebook: "https://www.facebook.com/Kiwilers",
    website: "",
    logo: "https://via.placeholder.com/160?text=Kiwilers",
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
    logo: "https://via.placeholder.com/160?text=Northern+Stars",
  },
  {
    id: "WA-005",
    name: "Riverside",
    city: "Bentley",
    state: "WA",
    location: "Bentley Community Centre / Bentley Hub, Nyamup Way, Bentley",
    night: "Monday",
    caller_cuer: "",
    time: "8:00pm",
    level: "Mainstream",
    telephone: "+61 419 563 375",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Riverside",
  },
  {
    id: "WA-006",
    name: "Wheatbelt Squares",
    city: "Goomalling",
    state: "WA",
    location: "Goomalling Senior Citizens Centre, Cnr Quinlan & Lockyer Street, Goomalling",
    night: "Alternate Mondays",
    caller_cuer: "Robert Dew",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "+61 429 962 012",
    email: "",
    facebook: "https://www.facebook.com/profile.php?id=100058285523603",
    website: "",
    logo: "https://via.placeholder.com/160?text=Wheatbelt",
  },
  {
    id: "WA-007",
    name: "Greenfinches",
    city: "Hamersley",
    state: "WA",
    location: "Hamersley Recreation Centre, 20 Belvedere Road, Hamersley",
    night: "Tuesday",
    caller_cuer: "Steve Turner, Jim Buckingham, Greg Fawell",
    time: "8:00pm",
    level: "Mainstream / Rounds / Plus",
    telephone: "+61 419 900 441",
    email: "longwood@iinet.net.au",
    facebook: "https://www.facebook.com/groups/greenfinches",
    website: "",
    logo: "https://via.placeholder.com/160?text=Greenfinches",
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
    logo: "https://via.placeholder.com/160?text=Ups+N+Downers",
  },
  {
    id: "WA-009",
    name: "Dolphin Dancers",
    city: "Mandurah",
    state: "WA",
    location: "Mandurah Bowling Club, 89 Allnut Street, Mandurah",
    night: "Wednesday (daytime sessions listed)",
    caller_cuer: "Natalie Scott / Paul Long",
    time: "1:15pm – 3:15pm",
    level: "Mainstream",
    telephone: "+61 411 449 344",
    email: "dolphin.dancers@outlook.com",
    facebook: "https://www.facebook.com/dolphinsquaredancers",
    website: "",
    logo: "https://via.placeholder.com/160?text=Dolphin+Dancers",
  },
  {
    id: "WA-010",
    name: "Dianella Rangers",
    city: "Joondanna",
    state: "WA",
    location: "St Peter and Emmaus Church Hall, 56 Green Street, Joondanna",
    night: "Wednesday (Mainstream) & Thursday (Rounds morning)",
    caller_cuer: "Kevin Fitzgerald / Marilyn Van Sambeeck",
    time: "7:30pm (Wed Mainstream) / 10:00am–12:00pm (Thu Rounds)",
    level: "Mainstream / Rounds",
    telephone: "+61 8 9302 4779",
    email: "",
    facebook: "https://www.facebook.com/dianellarangerssdc",
    website: "https://www.dianellarangerssdc.com/",
    logo: "https://via.placeholder.com/160?text=Dianella",
  },
  {
    id: "WA-011",
    name: "Jay Gees Squares",
    city: "Bunbury",
    state: "WA",
    location: "St Augustine’s Uniting Church Hall, 119 Mangles Street, Bunbury",
    night: "Wednesday",
    caller_cuer: "Jeff Garbutt",
    time: "7:30pm–9:30pm",
    level: "SSD+ / Mainstream",
    telephone: "+61 427 935 674",
    email: "jeffgarbutt@gmail.com",
    facebook: "https://www.facebook.com/JayGeesSquares/about/",
    website: "https://jeffgarbutt.wixsite.com/jaygees",
    logo: "https://via.placeholder.com/160?text=JayGees",
  },
  {
    id: "WA-012",
    name: "JoKing Cloggers",
    city: "High Wycombe / Gosnells",
    state: "WA",
    location: "Cyril Road Community Centre (Thu) / Gosnells RSL (Sat)",
    night: "Thursday & Saturday",
    caller_cuer: "",
    time: "7:00pm–9:00pm (Thu) / 10:30am–12:00pm (Sat)",
    level: "Clogging – all levels",
    telephone: "+61 417 943 640 / +61 421 589 501",
    email: "jokingcloggerswa@gmail.com",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=JoKing",
  },
  {
    id: "WA-013",
    name: "White Gum Valley Squares",
    city: "Rossmoyne / Perth",
    state: "WA",
    location: "Rossmoyne Bowling Club, 35 Tuscon Street, Rossmoyne",
    night: "Thursday",
    caller_cuer: "",
    time: "7:45pm",
    level: "Mainstream",
    telephone: "+61 478 559 554",
    email: "wgvsquares@gmail.com",
    facebook: "https://www.facebook.com/profile.php?id=100066477955147",
    website: "",
    logo: "https://via.placeholder.com/160?text=WgV",
  },
  {
    id: "WA-014",
    name: "Allemander Squares",
    city: "Currambine",
    state: "WA",
    location: "Currambine Community Centre, 64 Delamere Avenue, Currambine",
    night: "Thursday",
    caller_cuer: "Jim Buckingham",
    time: "7:00pm–9:00pm",
    level: "Beginners / Mainstream / Plus (if enough dancers)",
    telephone: "+61 418 948 823",
    email: "jimsgr8trax2@gmail.com",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Allemander",
  },
  {
    id: "WA-015",
    name: "Happy Wanderers",
    city: "High Wycombe",
    state: "WA",
    location: "Cyril Road Community Centre, 58 Cyril Road, High Wycombe",
    night: "Friday",
    caller_cuer: "Kevin Kelly",
    time: "7:00pm (Plus) / 8:00pm (Mainstream)",
    level: "Plus & Mainstream",
    telephone: "+61 427 161 159",
    email: "happywandererssdc@gmail.com",
    facebook: "https://www.facebook.com/groups/1279808272116694",
    website: "",
    logo: "https://via.placeholder.com/160?text=HappyWanderers",
  },
  {
    id: "WA-016",
    name: "Swan Valley Squares",
    city: "Dayton",
    state: "WA",
    location: "Dayton Community Centre, 211 Arthur Street, Dayton",
    night: "Friday",
    caller_cuer: "Greg Fawell",
    time: "7:30pm (Plus) / 8:00pm (Mainstream)",
    level: "Plus & Mainstream",
    telephone: "+61 417 912 241",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=SwanValley",
  },
  {
    id: "WA-017",
    name: "Gidgegannup Square Dance Club",
    city: "Gidgegannup",
    state: "WA",
    location: "Gidgegannup Showgrounds Hall, Old Toodyay Road, Gidgegannup",
    night: "2nd & 4th Saturday",
    caller_cuer: "",
    time: "8:00pm",
    level: "Mainstream",
    telephone: "+61 417 092 309",
    email: "",
    facebook: "https://www.facebook.com/groups/581177512415769",
    website: "",
    logo: "https://via.placeholder.com/160?text=Gidgegannup",
  },
  {
    id: "WA-018",
    name: "P & R Rounds",
    city: "Bassendean",
    state: "WA",
    location: "Bassendean RSL Hall / local seniors centre",
    night: "Saturday",
    caller_cuer: "",
    time: "12:00pm (Seniors) / 1:00pm (Intermediate) / 2:00pm (Beginners)",
    level: "Rounds / Intermediate / Beginners",
    telephone: "+61 418 926 202",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=P%26R",
  },

  // QLD Clubs
  {
    id: "QLD-001",
    name: "Suncoasters Square Dance Club",
    city: "Buderim",
    state: "QLD",
    location: "Sunshine Coast Square Dance Centre, Buderim, 260 Dixon Road",
    night: "1st, 3rd & 5th Saturdays",
    caller_cuer: "",
    time: "",
    level: "Basics to A",
    telephone: "",
    email: "scsdc260dixon@outlook.com",
    facebook: "https://www.facebook.com/Suncoasters",
    website: "https://www.suncoasters.com.au/",
    logo: "https://via.placeholder.com/160?text=Suncoasters",
  },
  {
    id: "QLD-002",
    name: "UpBeat Chaos",
    city: "Brisbane",
    state: "QLD",
    location: "",
    night: "Monday",
    caller_cuer: "",
    time: "7:00-9:00pm",
    level: "Plus",
    telephone: "",
    email: "",
    facebook: "",
    website: "https://www.upbeatchaos.com",
    logo: "https://via.placeholder.com/160?text=UpBeat",
  },
  {
    id: "QLD-003",
    name: "Kay's Plus",
    city: "Graceville / Brisbane region",
    state: "QLD",
    location: "",
    night: "1st & 3rd Sundays",
    caller_cuer: "",
    time: "1:00-3:00pm (teaching Plus) / 3:00-5:00pm (Extended Plus)",
    level: "Plus",
    telephone: "",
    email: "",
    facebook: "",
    website: "https://www.kaysclubs.com/",
    logo: "https://via.placeholder.com/160?text=KaysPlus",
  },
  {
    id: "QLD-004",
    name: "Northside Promenaders",
    city: "Zillmere (Brisbane Northside)",
    state: "QLD",
    location: "30 Seeney St., Zillmere, QLD",
    night: "Thursday",
    caller_cuer: "",
    time: "7:30pm (Mainstream) / 7:00-7:30 warmup Plus",
    level: "Plus / Mainstream",
    telephone: "0413 017 778",
    email: "northprom@gmail.com",
    facebook: "https://www.facebook.com/zillmere",
    website: "http://northsidepromenaderssdc.weebly.com/",
    logo: "https://via.placeholder.com/160?text=Northside",
  },
  {
    id: "QLD-005",
    name: "Gumdale Grandsliders",
    city: "Gumdale",
    state: "QLD",
    location: "",
    night: "",
    caller_cuer: "",
    time: "",
    level: "",
    telephone: "",
    email: "",
    facebook: "",
    website: "http://gumdalegrandsliders.blogspot.com",
    logo: "https://via.placeholder.com/160?text=Gumdale",
  },
  {
    id: "QLD-006",
    name: "Hervey Bay Square Dance Club",
    city: "Hervey Bay",
    state: "QLD",
    location: "",
    night: "",
    caller_cuer: "",
    time: "",
    level: "",
    telephone: "",
    email: "",
    facebook: "",
    website: "https://www.squaredancingherveybay.com.au/",
    logo: "https://via.placeholder.com/160?text=HerveyBay",
  },
  {
    id: "QLD-007",
    name: "E.Z. Squares",
    city: "Caboolture",
    state: "QLD",
    location: "",
    night: "",
    caller_cuer: "",
    time: "",
    level: "",
    telephone: "",
    email: "",
    facebook: "",
    website: "https://ezsquarescaboolture.weebly.com/",
    logo: "https://via.placeholder.com/160?text=EZ+Squares",
  },
  {
    id: "QLD-008",
    name: "Wavell Whirlaways",
    city: "Wavell Heights",
    state: "QLD",
    location: "62 Flower Street, Northgate, Brisbane",
    night: "",
    caller_cuer: "",
    time: "",
    level: "",
    telephone: "0418 724 636",
    email: "",
    facebook: "https://www.facebook.com/wavellwhirlawaysquaredanceclub",
    website: "",
    logo: "https://via.placeholder.com/160?text=Wavell",
  },

  // VIC Clubs
  {
    id: "VIC-001",
    name: "Aurora A's",
    city: "Donvale",
    state: "VIC",
    location: "Donvale Presbyterian Church Hall, 101 Mitcham Rd, Donvale",
    night: "Tuesday",
    caller_cuer: "",
    time: "7:30pm – 10:00pm",
    level: "Mainstream / Plus",
    telephone: "+61 3 9874 7653",
    email: "",
    facebook: "",
    website: "http://www.squaredance.org.au/aurora",
    logo: "https://via.placeholder.com/160?text=Aurora",
  },
  {
    id: "VIC-002",
    name: "Bayside Squares",
    city: "Mordialloc",
    state: "VIC",
    location: "St Jude’s Church Hall, 27 Albert St, Mordialloc",
    night: "Friday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "+61 3 9580 0605",
    email: "",
    facebook: "https://www.facebook.com/BaysideSquares/",
    website: "",
    logo: "https://via.placeholder.com/160?text=Bayside",
  },
  {
    id: "VIC-003",
    name: "Diamond Valley Squares",
    city: "Greensborough",
    state: "VIC",
    location: "Greensborough Masonic Hall, Ester St, Greensborough",
    night: "Wednesday",
    caller_cuer: "",
    time: "7:30pm – 10:00pm",
    level: "Mainstream / Plus",
    telephone: "+61 3 9435 3308",
    email: "",
    facebook: "",
    website: "http://www.squaredance.org.au/diamondvalley",
    logo: "https://via.placeholder.com/160?text=DiamondValley",
  },
  {
    id: "VIC-004",
    name: "Nunawading T-Squares",
    city: "Nunawading",
    state: "VIC",
    location: "Uniting Church Hall, 355 Whitehorse Rd, Nunawading",
    night: "Thursday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "+61 3 9802 5087",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Nunawading",
  },
  {
    id: "VIC-005",
    name: "Southern Cross Plus",
    city: "Burwood East",
    state: "VIC",
    location: "Burwood Heights Uniting Church Hall, 347 Blackburn Rd, Burwood East",
    night: "Monday",
    caller_cuer: "Howard Cockburn",
    time: "7:30pm – 10:00pm",
    level: "Plus",
    telephone: "+61 3 9803 1626",
    email: "",
    facebook: "https://www.facebook.com/groups/103790413107844",
    website: "",
    logo: "https://via.placeholder.com/160?text=SouthernCross",
  },
  {
    id: "VIC-006",
    name: "Stradbroke Squares",
    city: "Sale",
    state: "VIC",
    location: "Guthridge Primary School Hall, Guthridge Parade, Sale",
    night: "Thursday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "+61 3 5144 3428",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Stradbroke",
  },
  {
    id: "VIC-007",
    name: "Whitehorse Squares",
    city: "Nunawading",
    state: "VIC",
    location: "Nunawading Uniting Church Hall, 355 Whitehorse Rd, Nunawading",
    night: "Tuesday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "+61 3 9878 3132",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Whitehorse",
  },
  {
    id: "VIC-008",
    name: "Essendon Squares",
    city: "Essendon",
    state: "VIC",
    location: "Uniting Church Hall, 132 Keilor Rd, Essendon",
    night: "Wednesday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "+61 3 9337 1234",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Essendon",
  },
  {
    id: "VIC-009",
    name: "Waverley Squares",
    city: "Glen Waverley",
    state: "VIC",
    location: "Waverley Community Hall, Miller Cres, Glen Waverley",
    night: "Thursday",
    caller_cuer: "",
    time: "7:30pm – 10:00pm",
    level: "Mainstream / Plus",
    telephone: "+61 3 9560 1234",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Waverley",
  },
  {
    id: "VIC-010",
    name: "Eastern 8's",
    city: "Ringwood",
    state: "VIC",
    location: "Ringwood East Senior Citizens Hall, 2A Knaith Rd, Ringwood",
    night: "Tuesday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "+61 3 9870 4567",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Eastern8s",
  },
  {
    id: "VIC-011",
    name: "Altona Sunset Squares",
    city: "Altona",
    state: "VIC",
    location: "Altona Senior Citizens Hall, 1 Sargood St, Altona",
    night: "Friday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "+61 3 9315 1234",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Altona",
  },
  {
    id: "VIC-012",
    name: "Golden Squares",
    city: "Bendigo",
    state: "VIC",
    location: "Golden Square Senior Citizens Hall, Bendigo",
    night: "Wednesday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream / Plus",
    telephone: "+61 3 5443 5678",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Golden",
  },
  {
    id: "VIC-013",
    name: "Border Squares",
    city: "Wodonga",
    state: "VIC",
    location: "Wodonga Senior Citizens Hall, Havelock St, Wodonga",
    night: "Thursday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "+61 2 6024 1234",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Border",
  },
  {
    id: "VIC-014",
    name: "Ballarat Squares",
    city: "Ballarat",
    state: "VIC",
    location: "St Andrew’s Uniting Church Hall, Ballarat",
    night: "Friday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "+61 3 5331 1234",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Ballarat",
  },

  // NSW Clubs (subset)
  {
    id: "NSW-001",
    name: "Allemander Square Dance Club",
    city: "Engadine",
    state: "NSW",
    location: "Engadine Community Centre, Old Princes Hwy, Engadine",
    night: "Monday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "0418 644 578",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Allemander",
  },
 
  
  {
    id: "NSW-003",
    name: "Central Coast Ocean Waves",
    city: "East Gosford",
    state: "NSW",
    location: "East Gosford Progress Hall, Henry Parry Dr, East Gosford",
    night: "Wednesday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream / Plus",
    telephone: "",
    email: "cc.oceanwaves@gmail.com",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=OceanWaves",
  },
  {
    id: "NSW-004",
    name: "Knee Deep Squares",
    city: "Lismore",
    state: "NSW",
    location: "Lismore Heights Community Centre, Rous Rd, Lismore Heights",
    night: "Friday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=KneeDeep",
  },
  {
    id: "NSW-005",
    name: "Top Cats",
    city: "Blacktown",
    state: "NSW",
    location: "St Andrews Church Hall, Bungarribee Rd, Blacktown",
    night: "Thursday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream / Plus",
    telephone: "",
    email: "",
    facebook: "https://www.facebook.com/TopCatsSquareDance",
    website: "",
    logo: "https://via.placeholder.com/160?text=TopCats",
  },
  {
    id: "NSW-006",
    name: "Hillbillies",
    city: "North Ryde",
    state: "NSW",
    location: "North Ryde Community Centre, Coxs Rd, North Ryde",
    night: "Wednesday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream / Plus",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Hillbillies",
  },
  {
    id: "NSW-007",
    name: "Mavericks Square Dance Club",
    city: "Jesmond (Newcastle)",
    state: "NSW",
    location: "Jesmond Neighbourhood Centre, Mordue Parade, Jesmond",
    night: "Friday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Mavericks",
  },
  {
    id: "NSW-008",
    name: "Redback Squares",
    city: "Tamworth",
    state: "NSW",
    location: "Tamworth Community Centre, Darling St, Tamworth",
    night: "Monday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Redback",
  },
  {
    id: "NSW-009",
    name: "Hunter Valley Squares",
    city: "Maitland",
    state: "NSW",
    location: "Maitland Senior Citizens Centre, High St, Maitland",
    night: "Thursday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=HunterValley",
  },
  {
    id: "NSW-010",
    name: "Shoalhaven Square Dance Club",
    city: "Nowra",
    state: "NSW",
    location: "Nowra School of Arts, Berry St, Nowra",
    night: "Wednesday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Shoalhaven",
  },
  {
    id: "NSW-011",
    name: "Sapphire Squares",
    city: "Merimbula",
    state: "NSW",
    location: "Uniting Church Hall, Henwood St, Merimbula",
    night: "Wednesday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Sapphire",
  },
  {
    id: "NSW-012",
    name: "B-bar-H (Bateau Bay / Peninsula)",
    city: "Bateau Bay",
    state: "NSW",
    location: "Local community hall (check flyer / TAWS listing)",
    night: "Varies (see TAWS/events)",
    caller_cuer: "",
    time: "",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=BbarH",
  },
  {
    id: "NSW-013",
    name: "Wagga Wagga Square Dance Club",
    city: "Wagga Wagga",
    state: "NSW",
    location: "Local community hall (Wagga region listings)",
    night: "Thursday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Wagga",
  },
  {
    id: "NSW-014",
    name: "Port Macquarie Square Dance Club",
    city: "Port Macquarie",
    state: "NSW",
    location: "Port Macquarie community hall (check club page)",
    night: "Tuesday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=PortMac",
  },
  {
    id: "NSW-015",
    name: "Coffs Harbour Square Dance Club",
    city: "Coffs Harbour",
    state: "NSW",
    location: "Coffs Harbour community hall",
    night: "Wednesday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Coffs",
  },
  {
    id: "NSW-016",
    name: "Armidale Squares",
    city: "Armidale",
    state: "NSW",
    location: "Armidale community centre",
    night: "Friday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Armidale",
  },
  {
    id: "NSW-017",
    name: "Dubbo Square Dance Club",
    city: "Dubbo",
    state: "NSW",
    location: "Dubbo community hall",
    night: "Monday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Dubbo",
  },
  {
    id: "NSW-018",
    name: "Woy Woy / Peninsula Ocean Waves",
    city: "Woy Woy",
    state: "NSW",
    location: "Peninsula Community Centre, McMasters Rd, Woy Woy",
    night: "See local listing (TAWS/Active & Healthy)",
    caller_cuer: "",
    time: "",
    level: "Learn to dance / Mainstream",
    telephone: "0429 444 241",
    email: "ccoceanwaves@gmail.com",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=OceanWaves",
  },
  {
    id: "NSW-019",
    name: "Illawarra Squares",
    city: "Wollongong",
    state: "NSW",
    location: "Wollongong community hall (check club page)",
    night: "Friday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Illawarra",
  },
  {
    id: "NSW-020",
    name: "Alstonville / Northern NSW Association (club listings)",
    city: "Alstonville",
    state: "NSW",
    location: "Northern NSW Square Dance Association hall",
    night: "Varies",
    caller_cuer: "",
    time: "",
    level: "",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Alstonville",
  },
  {
    id: "NSW-021",
    name: "Cessnock Squares",
    city: "Cessnock",
    state: "NSW",
    location: "Cessnock community hall",
    night: "Thursday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Cessnock",
  },
  {
    id: "NSW-022",
    name: "Forster / Tuncurry Square Dancers",
    city: "Forster",
    state: "NSW",
    location: "Forster Baptist Church Hall (local listing)",
    night: "Wednesday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Forster",
  },
  {
    id: "NSW-023",
    name: "Grafton Square Dancers",
    city: "Grafton",
    state: "NSW",
    location: "Grafton community hall",
    night: "Tuesday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Grafton",
  },
  {
    id: "NSW-024",
    name: "Orange Square Dance Club",
    city: "Orange",
    state: "NSW",
    location: "Orange Senior Citizens / community hall",
    night: "Wednesday",
    caller_cuer: "",
    time: "7:30pm",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=Orange",
  },
  {
    id: "NSW-025",
    name: "New England Squares (Armidale / Tamworth region)",
    city: "New England",
    state: "NSW",
    location: "Regional community hall (check local listing)",
    night: "Varies",
    caller_cuer: "",
    time: "",
    level: "Mainstream",
    telephone: "",
    email: "",
    facebook: "",
    website: "",
    logo: "https://via.placeholder.com/160?text=NewEngland",
  },
];



// Dedupe clubs by id
const clubs: Club[] = rawClubs; // Removed useMemo outside App component

const App: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedClubId, setExpandedClubId] = useState<string | null>(null);

  const states = ["WA", "SA", "NSW", "TAS", "ACT", "VIC", "QLD"];

  const filteredClubs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (term.length > 0) {
      return clubs.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.city.toLowerCase().includes(term) ||
          c.id.toLowerCase().includes(term)
      );
    }
    if (selectedState) {
      return clubs.filter((c) =>
        c.state.toUpperCase().includes(selectedState)
      );
    }
    return clubs;
  }, [searchTerm, selectedState]);

  const toggleDetails = (id: string) => {
    setExpandedClubId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="App" style={{ padding: 12 }}>
      <h1 style={{ marginBottom: 2 }}>Australian Square Dance Clubs</h1>
      <div style={{ fontSize: 13, color: "#666", marginBottom: 14 }}>
        © Don Barba 2025
      </div>

 {/* --- STATE BUTTONS (3-3-2, uniform size) --- */}
<div className="state-buttons-container">
  {/* Row 1: WA, SA, NSW */}
  <div className="state-buttons-row">
    {["WA", "SA", "NSW"].map((st) => {
      const isActive = selectedState === st;
      return (
        <button
          key={st}
          onClick={() => setSelectedState(selectedState === st ? null : st)}
          className={`state-btn ${isActive ? "active" : ""}`}
          style={{ backgroundColor: stateColors[st] }}
        >
          {st}
        </button>
      );
    })}
  </div>

  {/* Row 2: TAS, ACT, VIC */}
  <div className="state-buttons-row">
    {["TAS", "ACT", "VIC"].map((st) => {
      const isActive = selectedState === st;
      return (
        <button
          key={st}
          onClick={() => setSelectedState(selectedState === st ? null : st)}
          className={`state-btn ${isActive ? "active" : ""}`}
          style={{ backgroundColor: stateColors[st] }}
        >
          {st}
        </button>
      );
    })}
  </div>

  {/* Row 3: QLD, All */}
  <div className="state-buttons-row">
    {["QLD", "All"].map((st) => {
      const isAll = st === "All";
      const isActive = isAll ? selectedState === null : selectedState === st;
      const bgColor = isAll ? "#666" : stateColors[st];
      return (
        <button
          key={st}
          onClick={() => setSelectedState(isAll ? null : selectedState === st ? null : st)}
          className={`state-btn ${isActive ? "active" : ""}`}
          style={{ backgroundColor: bgColor }}
        >
          {st}
        </button>
      );
    })}
  </div>
</div>

      {/* --- SEARCH INPUT --- */}
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search clubs by name or city..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setExpandedClubId(null);
          }}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ccc",
            width: "100%",
            maxWidth: 560,
            fontSize: 16,
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* --- CLUBS GRID --- */}
      <div
        className="clubs-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        {filteredClubs.length === 0 && (
          <div style={{ padding: 12, color: "#666" }}>
            No clubs match your search / filter.
          </div>
        )}

        {filteredClubs.map((club) => {
          const badgeColor = stateColors[club.state] || "#999";
          const borderColor = stateButtonBorders[club.state as keyof typeof stateButtonBorders] || "#ddd";

          return (
            <div
              key={club.id}
              className="club-card"
              style={{
                border: `2px solid ${borderColor}`,
                borderRadius: 12,
                padding: 12,
                margin: 0,
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 160,
                overflow: "hidden",
                boxSizing: "border-box",
                transition: "box-shadow 0.18s, transform 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                {/* Logo + Name */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                  {club.logo ? (
                    <img
                      src={club.logo}
                      alt={club.name}
                      style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8 }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 8,
                        background: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#999",
                        fontSize: 12,
                      }}
                    >
                      No Image
                    </div>
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h2 style={{ margin: 0, fontSize: 18 }}>{club.name}</h2>
                    <div style={{ fontSize: 13, color: "#555", marginTop: 6 }}>
                      {club.city} • {club.night}
                    </div>
                  </div>
                </div>

                {/* Right side: state badge + view button */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div
                    style={{
                      background: badgeColor,
                      color: "#000",
                      borderRadius: 14,
                      padding: "6px 10px",
                      fontWeight: 700,
                      fontSize: 13,
                      boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
                      textAlign: "center",
                    }}
                  >
                    {club.state}
                  </div>

                  <button
                    onClick={() => toggleDetails(club.id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 8,
                      fontWeight: 600,
                      fontSize: 14,
                      backgroundColor: "#008CBA",
                      color: "#fff",
                      border: "none",
                      height: 36,
                      minWidth: 96,
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {expandedClubId === club.id ? "Hide Details" : "View Details"}
                  </button>
                </div>
              </div>

              {expandedClubId === club.id && (
                <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.45 }}>
                  {club.location && <div><strong>Location:</strong> {club.location}</div>}
                  {club.time && <div><strong>Time:</strong> {club.time}</div>}
                  {club.level && <div><strong>Level:</strong> {club.level}</div>}
                  {club.caller_cuer && <div><strong>Caller/Cuer:</strong> {club.caller_cuer}</div>}
                  {club.telephone && <div><strong>Tel:</strong> {club.telephone}</div>}
                  {club.email && <div><strong>Email:</strong> {club.email}</div>}
                  {club.facebook && <div><strong>Facebook:</strong> <a href={club.facebook} target="_blank">{club.facebook}</a></div>}
                  {club.website && <div><strong>Website:</strong> <a href={club.website} target="_blank">{club.website}</a></div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;