const db = require('../../database/index');

// used in localLogin
const verifyUser = ( email) => {
    console.log("++++ In verifyUser, email:", email);

    const query = `
        SELECT * FROM users WHERE  email = $1`
    return db.oneOrNone(query, [email])
}

// used in jwtLogin
const findUserById = (id) => {
    console.log("++++ In findUserByID, id:", id);

    const query = `
        SELECT * FROM users WHERE  email = $1`  
    return db.one(query, [id])
}

module.exports = {verifyUser,findUserById };