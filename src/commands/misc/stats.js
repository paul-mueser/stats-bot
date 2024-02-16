const {EmbedBuilder} = require('discord.js');
const fetchAllMessages = require('../../utils/fetchAllMessages');
const quoteMessageHandler = require('../../handlers/quoteMessageHandler');

module.exports = {
    callback: async (client, interaction) => {
        const allMessages = await fetchAllMessages(client, "1208019091848171540");

        const messageData = quoteMessageHandler(allMessages);

        for (let i = 0; i < 24; i++) {
            // todo maybe add leading 0 to hours
            console.log(i + " Uhr: " + messageData.timeData[i]);
        }

        for (const key of messageData.sortedLeaderboard.keys()) {
            console.log(key + " : " + messageData.sortedLeaderboard.get(key));
        }

        // todo put everything in one string, maybe already in handler

        const embed = new EmbedBuilder()
            .setTitle("Zitat Statistiken")
            .setColor(0x0000FF); // todo change color

        interaction.reply({embeds: [embed]});
    },

    name: 'stats',
    description: 'Replies with the stats in "Zitate".',
};