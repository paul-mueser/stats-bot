require('dotenv').config();

const {Client, GatewayIntentBits} = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const mysql = require('mysql2');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});

(async () => {
    try {
        await con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        });

        con.end();
    } catch (error) {
        console.error(`Error: ${error}`);
    }
})();

eventHandler(client);


client.login(process.env.TOKEN);