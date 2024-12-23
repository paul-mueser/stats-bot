const {EmbedBuilder, AttachmentBuilder} = require('discord.js');
const fetchAllMessages = require('../../utils/fetchAllMessages');
const quoteStatsHandler = require('../../handlers/quoteStatsHandler');
const quoteTimeHandler = require('../../handlers/quoteTimeHandler');

module.exports = {
    callback: async (client, interaction) => {
        await interaction.deferReply();
        const channelId = interaction.guild.channels.cache.find(channel => channel.name === 'zitate')?.id || (interaction.guild.channels.cache.find(channel => channel.name === 'quotes')?.id || null);
        const allMessages = await fetchAllMessages(client, channelId);

        if (allMessages.length === 0) {
            await interaction.editReply('No messages found.');
            return;
        }

        const leaderboard = await quoteStatsHandler(allMessages);
        await quoteTimeHandler(allMessages);
        const attachment = new AttachmentBuilder('chart.png', {name: 'chart.png'});

        const embed = new EmbedBuilder()
            .setTitle("Zitat Statistiken")
            .setColor(0x9361e4)
            .addFields({
                name: "Geistige Tiefflieger",
                value: leaderboard,
                inline: true,
            })
            .setImage('attachment://chart.png');

        await interaction.editReply({embeds: [embed], files: [attachment]});
    },

    name: 'stats',
    description: 'Replies with the stats of "Zitate".',
};