const { Sequelize } = require('sequelize');

// Database connection setup
const sequelize = new Sequelize(
    process.env.DB_NAME,       // Database name
    process.env.DB_USER,     // Username
    process.env.DB_PASSWORD, // Password
    {
        host: process.env.DB_HOST, // Database host
        dialect: 'mysql',            // Using MySQL dialect
        logging: false,              // Disable SQL query logging
        port: process.env.DB_PORT,
    }
);

// Function to connect to the database
const connectDB = async () => {
    try {
        await sequelize.authenticate(); // Test connection
        console.log('MySQL database connected successfully!');
    } catch (err) {
        console.error('Unable to connect to the database:', err.message);
        process.exit(1); // Exit on failure
    }
};

// Export sequelize instance and connection function
module.exports = { sequelize, connectDB };
