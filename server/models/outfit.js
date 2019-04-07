const db = require('../../database');

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

    static async retrieveOne (req, res, next) {
        // const highTemp = req.query.highTemp;
        // const userId = req.query.userId;

        const { userId, highTemp} = req.query;
        console.log("highTemp :",highTemp, "userId:", userId ); 

        try{
            const outfit = await db.any(`
                    SELECT *
                    FROM outfits
                    WHERE ((outfits.user_id = $1) AND ($2 >= outfits.high_temp ) AND($3  <= outfits.high_temp))
                    ORDER BY id DESC
                    LIMIT 1` , [userId, parseInt(highTemp)+3,  parseInt(highTemp)-3])

            // const outfit = res[0]; 
            
            console.log(" in retrieveOne, outfit:",outfit);
            // find outfit for porposal
            if (outfit[0]){
                console.log(" in retrieveOne, outfit[0]:",outfit[0]);
                let outfitId = outfit[0].id;
                try{
                    const itemsOfOutfit = await db.any(`
                            SELECT items.image_location
                            FROM items
                            JOIN outfit_items ON outfit_items.item_id = items.id
                            WHERE outfit_items.outfit_id = $1` , [outfitId])
    
                    console.log("itemsOfOutfit:",itemsOfOutfit);
                    outfit[0].items =[...itemsOfOutfit]
    
                    console.log("outfit[0]:",outfit[0]);
                    console.log("outfit[0].items:",outfit[0].items);
                }   
                catch(error){
                    res.json(error); 
                }
            // no proper outfit for proposal : outfit = []
            } else {
                console.log(" in retrieveOne, no outfit matched.");
                
            }
           
            // res.json(outfit[0]) is not working
            res.json(outfit);
            
           
        }
        catch(error) {
            console.log("Error in retrieveOne:", error)
            res.json(error);
        }
    } 

    static async insert (req, res, next) {
        console.log("*In outfit insert, req.body:",req.body);
        console.log("*In outfit insert, req.body.weather:",req.body.weather);
        
        const weather = req.body.weather;    
        const userId = req.body.userId;  
        const outfitDate = new Date();  
        const itemIds = req.body.itemIds;  

        let outfitId = null;
        try{
            let outfit = await db.one(`INSERT INTO outfits 
                    (   
                        user_id,
                        weather_name,
                        weather_icon,
                        high_temp,
                        low_temp
                    )
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id`,
                    [
                        userId,
                        weather.name,
                        weather.icon,
                        weather.highTemp,
                        weather.lowTemp
                    ]
            );

            console.log("outfit.id of the new outfit:", outfit.id);
            outfitId = outfit.id;

            for(let itemId of itemIds){
                console.log("===item id of insert outfit_item:",itemId)
                try{
                    let data = await db.one('INSERT INTO outfit_items (outfit_id, item_id) VALUES ($1, $2) RETURNING *', [outfitId, itemId]) 
                    console.log("data of insert outfit_items:", data);
                    // res.json(res)
                }catch(error){
                    console.log("Error for insert outfit_items ", itemId," : ", error);
                    res.json(error) 
                }
            }
            
            res.json(outfit)
            
        }catch(error){
            console.log( "outfit insert error:",error);
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