const mysql = require('mysql2/promise');
const config = require('../db/config');
const pool = mysql.createPool(config);

const createTable = async (schema) => {
    const [results] = await pool.query(schema);
    return results;
};

const checkRecordExists = async (tableName, column, value) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    const [rows] = await pool.query(query, [value]);
    return rows.length ? rows[0] : null;
}


const insertRecord = async(tablename, record) => {
    const query = `INSERT INTO ${tablename} SET ?`;
    const [result] = await pool.query(query, [record]);
    return result;
};

module.exports = {
    createTable,
    checkRecordExists,
    insertRecord,
};