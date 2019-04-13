const db = require('../../database');

class Item {
    static retrieveALL (req, res, next) {
        const userId = req.query.userId;
        // const url = new URL("localhost:4646/api/items/" + req.url);
        // const userId = url.searchParams.get("userId");
        console.log(" ** In Item Retrieve ALL userId:",userId);

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
    static async delete (req, res, next) {
        const itemId = req.body.itemId;

        console.log("In delete, itemId:",itemId);

        try{
             const response = await db.any(`
                DELETE FROM  items
                WHERE id = $1 
                RETURNING *`, [itemId])
            console.log( "response of delete item:", response)
            try{
                const res = await db.any(`
                   DELETE FROM  outfit_items
                   WHERE item_id = $1 `, [itemId]);
            }catch(error){
                res.json(error) 
            } 
            res.json(response)
        }catch(error){
            res.json(error) 
        } 
    } 
}

module.exports = Item