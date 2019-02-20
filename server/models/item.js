
const db = require('../database');

class Item {
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
        // object item = { cate.. : 'top' , ...}  
        console.log( "In static insert, item:",item);    
        let id = 
        console.log( );    

        db.query(`INSERT INTO items 
                   (user_id, 
                    category, 
                    color, 
                    season, 
                    occasion, 
                    image_key, 
                    image_location
                    )                
                 VALUES 
                    ($1, $2, $3, $4, $5, $6, $7)`,
                [
                    2, 
                    item.category,
                    item.color, 
                    item.season, 
                    item.occasion, 
                    item.imageKey, 
                    item.imageLocation
                ],

                (err, res) => {
                    console.log("res of insert item:",res)
                    if (err.error)
                        return callback(err);
                    callback(res);
                 }
        );
    }
}


module.exports = Item