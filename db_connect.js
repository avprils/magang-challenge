const mysql = require('mysql');
const dotenv = require('dotenv'); //load package

//load dotenv config
dotenv.config();
/*
const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'magang_challenge'
});
*/

const conn = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name
});

conn.connect(function(err) {
    if(err) throw err;
    console.log('MySql Connected...');
});

module.exports=conn;