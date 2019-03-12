const db = require('../database/index');

class Item {
    static retrieveALL (req, res, next) {
        const url = new URL("localhost:4646/api/items/" + req.url);
        const userId = url.searchParams.get("userId");
        console.log("userId:",userId);

        db.any(`SELECT * FROM items WHERE user_id = ${userId}`)
        .then( data =>  res.json(data))
        .catch( error =>  res.json(error)  )
    }   
    static insert (req, res, next) {
        console.log("req.body:",req.body);
        const item = req.body.item;  
        const userId = req.body.userId;  

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
                    userId, 
                    item.category,
                    item.color, 
                    item.season, 
                    item.occasion, 
                    item.imageKey, 
                    item.imageLocation
                ])
        .then( data =>  res.json(data))
        .catch( error =>  res.json(error)  )
    }
}

module.exports = Item