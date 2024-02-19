const fetchAllMessages = require('../../utils/fetchAllMessages');
const quoteAuthorHandler = require('../../handlers/quoteAuthorHandler');

module.exports = {
    callback: async (client, interaction) => {
        const allMessages = await fetchAllMessages(client, interaction.guild.channels.cache.find(channel => channel.name === 'zitate').id);

        let messageData = "**Zitat Autoren Statistik:**\n"
        messageData += await quoteAuthorHandler(allMessages);

        interaction.reply(messageData);
    },

    name: 'authorstats',
    description: 'Replies with the authorstats of "Zitate".',
};