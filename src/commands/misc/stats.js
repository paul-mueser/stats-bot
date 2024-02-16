const fetchAllMessages = require('../../utils/fetchAllMessages');

module.exports = {
    callback: async (client, interaction) => {
        const allMessages = await fetchAllMessages(client, "1208019091848171540");

        for (const message of allMessages) {
            console.log(message.content);
        }
        interaction.reply("Success");
    },

    name: 'stats',
    description: 'Replies with the stats in "Zitate".',
};