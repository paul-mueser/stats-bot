const {testServer} = require('../../../config.json');
const mysql = require("mysql2");

module.exports = async (client) => {
    return;
    for (let guildId of client.guilds.cache.map(g => g.id)) {
        if (process.argv[2] === '--test') {
            guildId = testServer;
        }

        try {
            const con = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
            });

            await con.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
            });

            con.query(`CREATE DATABASE IF NOT EXISTS ${guildId}`, function (err, result) {
                if (err) throw err;
                console.log(`Database ${guildId} created`);
            });

            con.end();
        } catch (error) {
            console.log(`There was an error: ${error}`);
        }

        try {
            const con = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: guildId,
            });

            await con.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
            });

            con.query(`CREATE TABLE IF NOT EXISTS messages (creationdate TIMESTAMP, channel VARCHAR(255), author VARCHAR(255), PRIMARY KEY (channel, author, creationdate))`, function (err, result) {
                if (err) throw err;
                console.log(`Table messages created`);
            });

            con.end();
        } catch (error) {
            console.log(`There was an error: ${error}`);
        }
        
        if (process.argv[2] === '--test') {
            return;
        }
    }
};