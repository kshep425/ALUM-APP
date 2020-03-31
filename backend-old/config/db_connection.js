const Sequelize = require('sequelize');

function initialize_db(db_obj){
    const db_name = db_obj.database;
    const username = db_obj.username;
    const password = db_obj.password;
    const host = db_obj.host;

    return new Sequelize(db_name, username, password, {
        host: host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
      });
    }


module.exports = initialize_db;
