require('dotenv').config();

const {Client, GatewayIntentBits} = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

var mysql = require('mysql2');

var con = mysql.createConnection({
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

        eventHandler(client);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
})();


client.login(process.env.TOKEN);