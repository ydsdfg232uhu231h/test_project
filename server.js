import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Correct absolute path
const buildPath = path.join(__dirname, "client", "build");

// Debug log (important)
console.log("Serving from:", buildPath);

// Serve static
app.use(express.static(buildPath));

// API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend working ✅" });
});

// Catch-all
app.use((req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));