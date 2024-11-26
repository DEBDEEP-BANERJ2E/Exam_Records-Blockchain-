const express = require('express');
const cors = require('cors');
const app = express();
const studentRoutes = require('./routes/studentRoutes'); // Importing routes
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

// Use student routes
app.use('/api/students', studentRoutes); // All routes are handled here

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
