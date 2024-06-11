const sqlite3 = require('sqlite3').verbose();
const {createTable}  = require('./create');

const connectDB = () => {
    const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            return console.error("Error connecting to the database:", err.message);
        }
        console.log("Connected to the SQLite database.");
        createTable(db);
    });
    return db;
};

module.exports = {
    connectDB
};