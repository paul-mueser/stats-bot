const {EmbedBuilder} = require('discord.js');
const fetchAllMessages = require('../../utils/fetchAllMessages');
const quoteAuthorHandler = require('../../handlers/quoteAuthorHandler');

module.exports = {
    callback: async (client, interaction) => {
        const allMessages = await fetchAllMessages(client, interaction.guild.channels.cache.find(channel => channel.name === 'zitate').id);

        const messageData = await quoteAuthorHandler(allMessages);

        const embed = new EmbedBuilder()
            .setTitle("Zitat Autoren Statistik")
            .setDescription(messageData)
            .setColor(0x9361e4);

        interaction.reply({embeds: [embed]});
    },

    name: 'authorstats',
    description: 'Replies with the authorstats of "Zitate".',
};