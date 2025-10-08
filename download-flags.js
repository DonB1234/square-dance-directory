// download-flags.js
const fs = require("fs");
const https = require("https");
const path = require("path");

const flags = {
  WA: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Western_Australia.svg",
  SA: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_South_Australia.svg",
  VIC: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Victoria.svg",
  NSW: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_New_South_Wales.svg",
  ACT: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Australian_Capital_Territory.svg",
  QLD: "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Queensland.svg",
  TAS: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_Tasmania.svg",
};

const outputDir = path.join(process.cwd(), "public", "flags");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log("📥 Downloading flags...");

for (const [state, url] of Object.entries(flags)) {
  const filePath = path.join(outputDir, `${state}.svg`);
  const file = fs.createWriteStream(filePath);

  https.get(url, (res) => {
    res.pipe(file);
    file.on("finish", () => {
      file.close();
      console.log(`✅ Downloaded: ${state}.svg`);
    });
  }).on("error", (err) => {
    fs.unlink(filePath, () => {});
    console.error(`❌ Failed: ${state}`, err.message);
  });
}
