const db = require('../database');

class Cities {
    // if need some filtering, use parameter and use it in query
    // static retrieveALL (callback) {
    //     db.query('SELECT city_name FROM cities', (err, res) => {
    //         if (err.error) 
    //             return callback(err);
    //         callback(res);
    //     } )
        
    // }

    static retrieveALL (req, res, next) {
        db.any('SELECT city_name FROM cities')
        .then( data =>  res.json(data))
        .catch( error =>  res.json(error)  )
    }   

    // static insert (city, callback) {              
    //     db.query('INSERT INTO cities (city_name) VALUES ($1)', [city], (err, res) => {
    //         if (err.error)
    //           return callback(err);
    //         callback(res);
    //       });
    // }

    static async insert (req, res, next) {
        const city = req.body.city;    
        console.log("****** req.body:",req.body);
        let city_id = null;
        try{
            let res = await db.one('INSERT INTO cities (city_name) VALUES ($1) RETURNING id', [city]) 
            city_id = res.id;
            // res.json(res)

            try{
                res = await db.one('INSERT INTO user_cities (user_id, city_id) VALUES ($1, $2) RETURNING *', [req.body.userId, city_id]) 
                console.log("==== In user_cities insert, res",res)
                res.json(res)
            }catch(error){
                res.json(error) 
            }
        }catch(error){
            res.json(error) 
        }
    };
}


module.exports = Cities