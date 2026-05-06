const mysql = require('mysql2/promise');
const config = require('./config');
let pool;
const connectDB = async () => {
    try {
        pool = await mysql.createPool(config);
        const connection = await pool.getConnection();
        console.log("Connected to MySQL database");
        connection.release();
    } catch (error) {
        console.log("DB is not connected error:", error.message);
    }
     
};
module.exports = {connectDB,  pool};