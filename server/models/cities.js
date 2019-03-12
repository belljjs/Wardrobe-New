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

    static insert (req, res, next) {
        const city = req.body.city;            
        db.one('INSERT INTO cities (city_name) VALUES ($1)', [city]) 
         .then( data =>  res.json(data))
         .catch(error =>  res.json(error)  )
    };
}


module.exports = Cities