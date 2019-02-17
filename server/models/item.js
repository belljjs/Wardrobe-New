
const db = require('../database');

class Items {
    // if need some filtering, use parameter and use it in query
    static retrieveALL (callback) {
        db.query('SELECT city_name FROM items', (err, res) => {
            if (err.error) {
                return callback(err)
            };
            callback(res);
        } )
        
    }
    // static retrieveOne (callback) {
    //     db.query('SELECT city_name FROM items WHERE (id) IS ($1)', [id], (err, res) => {
    //         if (err.error) {
    //             return callback(err)
    //         };
    //         callback(res);
    //     } )
        
    // }
    static insert (item, callback) {              
        db.query('INSERT INTO items (categori_id) VALUES ($1)', [item.category], (err, res) => {
            if (err.error)
              return callback(err);
            callback(res);
          });
    }
}

module.exports = Cities