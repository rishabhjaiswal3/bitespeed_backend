const getUsersByEmailOrPhoneNumber = (db, email, phoneNumber) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ? OR phoneNumber = ?';
        db.all(query, [email, phoneNumber], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

module.exports = {
    getUsersByEmailOrPhoneNumber,
}