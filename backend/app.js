require('dotenv').config(); // Load environment variables
const express = require('express');
const { connectDB, sequelize } = require('./config/db'); // Adjusted the path for db.js

const app = express();
const PORT = process.env.PORT || 5001; // You can keep this as 5001 or another unused port
app.use(express.json()); // Parse JSON payloads

// Enable CORS for all domains
const cors = require('cors');
app.use(cors());

// Import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const institutionRoutes = require('./routes/institutionRoutes');
const employerRoutes = require('./routes/employerRoutes');
const recordRoutes = require('./routes/recordRoutes');
const verificationRoutes = require('./routes/verificationRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/institutions', institutionRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/verify', verificationRoutes);

// Connect to database and start the server
(async () => {
    try {
        await connectDB(); // Establish database connection
        await sequelize.sync({ force: false }); // Sync models with database; force=false prevents data loss
        console.log('Database synced successfully.');

        // Start the server after database connection is successful
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Error starting server:', err.message);
    }
})();
