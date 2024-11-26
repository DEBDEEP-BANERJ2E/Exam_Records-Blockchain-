const express = require("express");
const cors = require("cors");
const recordsRoutes = require("./routes/recordsRoutes"); // Import the routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// API Routes
app.use("/api", recordsRoutes);

// Start the server on port 4000
const port = 4000;
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});

