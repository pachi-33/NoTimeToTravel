const mysql = require('mysql');
const {host, user, password, database, dbport} = require('../config/dbConnection');

const dbPool = mysql.createPool({
    host,
    user,
    password,
    database,
    port: dbport
  });

const myQuery = function(sql, values){
    return new Promise((resolve, reject)=>{
        dbPool.getConnection(function(err, connection){
            if(err) {
                reject(err);
            }else{
                connection.query(sql, values, (err, rows) => {
                    if( err ){
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    })
}

module.exports = {myQuery};