
const db = require('../db');

class Items {
    // if need some filtering, use parameter and use it in query
    static retrieveALL (callback) {
        db.query('SELECT * FROM items WHERE (user_id) IS ($1)', [user_id], (err, res) => {
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
        db.query(`INSERT INTO items 
                   (user_id, 
                    category_id, 
                    color_id, 
                    season_id, 
                    occasion_id, 
                    imgURL, 
                    imgName, 
                    itemDate )                
                 VALUES 
                    (item.user, 
                    item.category, 
                    item.color, 
                    item.season, 
                    item.occasion, 
                    item.imgURL, 
                    item.imgName)`, 
                (err, res) => {
                    if (err.error)
                    return callback(err);
                    callback(res);
                 }
        );
    }
}


module.exports = Cities