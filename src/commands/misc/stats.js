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

        interaction.reply("Success");
    },

    name: 'stats',
    description: 'Replies with the stats in "Zitate".',
};