const mysql = require('mysql');
const dotenv = require('dotenv');
const os = require('os');
const dns = require('dns');

let instance = null;
dotenv.config();

let connection = mysql.createConnection({
    host: process.env.VMC_HOST_DB,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    insecureAuth: true

});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {

            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM demo;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async changeDBConnection() {
            connection.end();
            connection = mysql.createConnection({
                host: process.env.LOCAL_HOST_DB,
                user: process.env.USERNAME,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                port: process.env.DB_PORT,
                insecureAuth: true
            
            });

            connection.connect((err) => {
                if (err) {
                    console.log(err.message);
                }
                // console.log('db ' + connection.state);
            });

            return "OK";
    }
}

module.exports = DbService;
