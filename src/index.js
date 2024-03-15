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

eventHandler(client);

global.botId = process.env.BOT_ID;

client.login(process.env.TOKEN);