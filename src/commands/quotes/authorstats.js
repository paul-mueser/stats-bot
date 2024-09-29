const fetchAllMessages = require('../../utils/fetchAllMessages');
const quoteAuthorHandler = require('../../handlers/quoteAuthorHandler');
const {EmbedBuilder} = require("discord.js");

module.exports = {
    callback: async (client, interaction) => {
        await interaction.deferReply();
        const channelId = interaction.guild.channels.cache.find(channel => channel.name === 'zitate')?.id || (interaction.guild.channels.cache.find(channel => channel.name === 'quotes')?.id || null);
        const allMessages = await fetchAllMessages(client, channelId);

        if (allMessages.length === 0) {
            await interaction.editReply('No messages found.');
            return;
        }
        
        let messageData = await quoteAuthorHandler(allMessages);

        const embed = new EmbedBuilder()
            .setTitle("Zitat Autoren Statistik:")
            .setDescription(messageData)
            .setColor(0x9361e4);

        await interaction.editReply({embeds: [embed]});
    },

    name: 'authorstats',
    description: 'Replies with the authorstats of "Zitate".',
};