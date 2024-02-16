const fetchAllMessages = require('../../utils/fetchAllMessages');

module.exports = {
    name: 'stats',
    description: 'Replies with the stats in "Zitate".',

    callback: async (client, interaction) => {
        const allMessages = await fetchAllMessages(client, "1208019091848171540");

        for (const message of allMessages) {
            console.log(message.content);
        }
        interaction.reply("Success");
    },
};