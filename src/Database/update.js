const updateUserLinkPrecedenceAndLinkedId = (db, id, linkPrecedence, linkedId) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE users SET linkPrecedence = ?, linkedId = ?, updatedAt = ? WHERE id = ?`;
        const updatedAt = new Date().toISOString();
        db.run(query, [linkPrecedence, linkedId, updatedAt, id], function (err) {
            if (err) {
                return reject(err);
            }
            resolve({ changes: this.changes });
        });
    });
};


module.exports = {
    updateUserLinkPrecedenceAndLinkedId,
}