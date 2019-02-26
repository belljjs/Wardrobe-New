
const db = require('../database/index');

class Item {

    static retrieveALL (callback) {
        db.query(`SELECT * FROM items WHERE user_id = 2` , (err, res) => {
            console.log("++++ In retrieveAll: query res: ",res);
            if (err.error) {
                console.log("---- err in   db.query(`SELECT * FROM items ...");
                return callback(err, null);
            } else {
                console.log("+++  db.query(`SELECT * FROM items ...");
                callback(null, res);
            }
        } )
    }

    static insert (item, callback) {     
        console.log( "In  insert: item:",item);    
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
                        return callback(err, null);
                    callback({}, res);
                 }
        );
    }
}

module.exports = Item