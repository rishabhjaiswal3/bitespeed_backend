const insertUser = (db, user) => {
    let query = `INSERT INTO users (phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [user.phoneNumber, user.email, user.linkedId, user.linkPrecedence, user.createdAt, user.updatedAt], function(err) {
        if (err) {
            return console.error("Error inserting user:", err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
};

module.exports = {
    insertUser
}