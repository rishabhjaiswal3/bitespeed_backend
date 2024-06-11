const createTable = (db) => {
    try{

        let query = `CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            phoneNumber TEXT,
            email TEXT,
            linkedId INTEGER,
            linkPrecedence TEXT,
            createdAt TEXT,
            updatedAt TEXT
        )`;
    
        db.run(query, (err) => {
            if (err) {
                return console.error("Error creating table:", err.message);
            }
            console.log("Table 'orders' created or already exists.");
        });
    }
    catch(e) {
        console.log("facing error while creation of table  with message : ",e.message);
    }
};


module.exports = {
    createTable
}