const db = require('../../database');

class Cities {

    static retrieveALL (req, res, next) {
        const userId = req.query.userId;
        console.log("userId:", userId)
        // db.any(`SELECT cities.city_name 
        //         FROM user_cities
        //         JOIN cities ON user_cities.city_id = cities.id
        //         WHERE user_cities.user_id = ($1) `, [userId])
        db.any(`SELECT city_name 
                FROM cities
                WHERE user_id = ($1) `, [userId])
        .then( data =>  res.json(data))
        .catch( error =>  res.json(error)  )
    }   

    static async insert (req, res, next) {
        console.log("****** req.body:",req.body);
        const city = req.body.city;    
        const userId = req.body.userId;    
        let city_id = null;
        try{
            // let res = await db.one('INSERT INTO cities (city_name) VALUES ($1) RETURNING id', [city]) 
            let res = await db.one('INSERT INTO cities (city_name, user_id) VALUES ($1, $2) RETURNING id', [city, userId]) 
            city_id = res.id;
            console.log("New city id:", city_id);
            res.json(res)

            // try{
            //     res = await db.one('INSERT INTO user_cities (user_id, city_id) VALUES ($1, $2) RETURNING *', [req.body.userId, city_id]) 
            //     res.json(res)
            // }catch(error){
            //     res.json(error) 
            // }
        }catch(error){
            res.json(error) 
        }
    };
}


module.exports = Cities