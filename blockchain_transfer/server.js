// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const recordRoutes = require('./routes/recordRoutes'); // Import the routes
const fs = require('fs');
const path = require('path');
dotenv.config();
const cors = require('cors');

const app = express();
const port = 5002; // Port for the server

app.use(cors()); 

// Middleware to parse incoming JSON data
app.use(express.json());

// Register the route to handle records (this will now be `/add` instead of `/api/records`)
app.use('/add', recordRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
