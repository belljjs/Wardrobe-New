const db = require('../database/index');

class Outfit {

     static async retrieveAll (req, res, next) {
        const userId = req.query.userId;
        console.log("userId :",userId )
        try{
            const outfitList = await db.any(`
                    SELECT *
                    FROM outfits
                    WHERE outfits.user_id = $1` , [userId])

            for(let outfit of outfitList){
                // outfit.items =[];
                let outfitId = outfit.id
                try{
                    const itemsForAnOutfit = await db.any(`
                            SELECT outfit_items.item_id, items.image_location
                            FROM outfit_items
                            JOIN items ON outfit_items.item_id = items.id
                            WHERE outfit_items.outfit_id = $1` , [outfitId])

                    outfit.items =[...itemsForAnOutfit]
                }
                catch(error){
                    res.json(error); 
                }
            }
            res.json(outfitList );
        }
        catch(error) {
            res.json(error);
        }
    }

    static retrieveOne (req, res, next) {
        const userId = req.query.userId;
        db.any(`SELECT cities.city_name 
                FROM user_cities
                JOIN cities ON user_cities.city_id = cities.id
                WHERE user_cities.user_id = $1 `, [userId])
        .then( data =>  res.json(data))
        .catch( error =>  res.json(error)  )
    } 

    static async insert (req, res, next) {
        console.log("*In outfit insert, req.body:",req.body);
        const weather = req.body.weather;    
        const userId = req.body.userId;    
        const outfitDate = new Date();  
        const itemIds = req.body.itemIds;  

        let outfitId = null;
        try{
            console.log("*In outer Try");
            let res = await db.one(`INSERT INTO outfits 
                    (
                    user_id,
                    weather_name,
                    weather_icon,
                    high_temp,
                    low_temp,
                    outfit_date 
                    )
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING id`,
                    [
                    userId,
                    weather.weatherName,
                    weather.weatherIcon,
                    weather.highTemp,
                    weather.lowTemp,
                    outfitDate
                    ]
            ) 

            console.log("=== res:",res);
            outfitId = res.id;

            console.log("=== outfitId:",outfitId)
            
            for(let itemId of itemIds){
                console.log("===item id:",itemId)
                
                try{
                    res = await db.one('INSERT INTO outfit_items (outfit_id, item_id) VALUES ($1, $2) RETURNING *', [outfitId, itemId]) 
                    console.log("Each row of outfit_items:", res);
                    // res.json(res)
                }catch(error){
                    console.log("Error for item ", itemId," : ", error);
                    // res.json(error) 
                }
            }
            res.json(res)
            
        }catch(error){
            res.json(error) 
        }
    };

    static async delete (req, res, next) {
        const outfitId = req.body.outfitId;

        console.log("In delete, outfitId:",outfitId);

        try{
             const response = await db.any(`
                DELETE FROM  outfits
                WHERE id = $1 
                RETURNING *`, [outfitId])
            console.log( "response of delete outfit:", response)
            try{
                const res = await db.any(`
                   DELETE FROM  outfit_items
                   WHERE outfit_id = $1 `, [outfitId]);
            }catch(error){
                res.json(error) 
            } 
            res.json(response)
        }catch(error){
            res.json(error) 
        } 
    } 
}

module.exports = Outfit

// router.post( '/newOutfit',   Outfit.insert)
// router.get('/outfitsAll',  Outfit.retrieveALL)
// router.get('/proposal',  Outfit.retrieveOne)
// router.delete('/delete',  Outfit.delete)