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
if (process.env.ID_NAME_PAIRS) {
    global.idNamePairs = JSON.parse(process.env.ID_NAME_PAIRS);
} else {
    global.idNamePairs = {};
}

client.login(process.env.TOKEN);