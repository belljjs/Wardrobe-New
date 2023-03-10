const db = require('../../../database');

const createUser = (first_name, last_name, email, password) => {
    console.log(" ***  createUser/signUp/auth/model, email, password:", email, password);
    
    const query = `
        INSERT INTO users (first_name, last_name, email, pw) 
        VALUES ($1,$2,$3,$4)
        RETURNING *`
    return db.one(query, [first_name, last_name, email, password ])
}

module.exports = {createUser};