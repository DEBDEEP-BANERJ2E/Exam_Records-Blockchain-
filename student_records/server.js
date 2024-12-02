require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import exam records routes
const examRecordsRoutes = require('./routes/examRecords');
const studentRoutes = require('./routes/students'); // If you have other routes

const app = express();
const PORT = process.env.PORT || 8080;  // Set the correct port here

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());

// Routes
app.use('/api/records', examRecordsRoutes); // Add the exam records route
app.use('/api/students', studentRoutes);  // Example for another route

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Student Records API');
});

// Error handling for unmatched routes
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
