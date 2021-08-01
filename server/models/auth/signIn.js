const db = require('../../../database');


// used in jwtLogin
const findUserById = (id) => {
    console.log("***  findUserByID/signin/auth/model, id:", id);

    const query = `
        SELECT * FROM users WHERE  email = $1`  
    
    return db.one(query, [id])
}

module.exports = {findUserById };