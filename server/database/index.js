var { Pool } = require('pg');
//                                                    'postgresql://(username):(password)@(host):(port)/(database name)'
const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:minjin@localhost:5432/wardrobe-db';
const SSL = process.env.NODE_ENV === 'production';


class Database {
    constructor () {
        this._pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'wardrobe-db',
            // password: 'minjin',
            port: 5432,
            // connectionString: CONNECTION_STRING,
            ssl: SSL
        });

        this._pool.on('error', (err, client) => {
             console.error('Unexpected error on idle PostgreSQL client.', err);
             process.exit(-1);
        });

    }
    //     👇 sql  👇 param or calback
    query (query, ...args) {
        this._pool.connect((err, client, done) => {
            if (err) throw err;

            // param exist only for the case of 2 args
            const params = args.length === 2 ? args[0] : [];

            // callback always exist, so arg.length >= 1 
            // for the case 3,4,...  callback is second arg
            const callback = args.length === 1 ? args[0] : args[1];

            client.query(query, params, (err, res) => {
                done();
                console.log("*** Inside database, query, params:",query, params);
                console.log("*** Inside database err:",err);

                if (err) {
                    console.log(err.stack);
                    return callback({ error: 'Database error.' }, null);
                }
                callback({}, res.rows);
            });
        });

    }

    end () {
        this._pool.end();
    }
}

module.exports = new Database();