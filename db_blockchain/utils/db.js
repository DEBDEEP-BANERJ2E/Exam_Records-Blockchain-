const mysql = require('mysql2/promise');

let db;

exports.connectToDatabase = async () => {
    db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    console.log('Connected to MySQL database');
};

exports.db = db;
