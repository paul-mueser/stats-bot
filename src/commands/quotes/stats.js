const {EmbedBuilder, AttachmentBuilder} = require('discord.js');
const fetchAllMessages = require('../../utils/fetchAllMessages');
const quoteStatsHandler = require('../../handlers/quoteStatsHandler');

module.exports = {
    callback: async (client, interaction) => {
        interaction.deferReply();
        const allMessages = await fetchAllMessages(client, interaction.guild.channels.cache.find(channel => channel.name === 'zitate').id);

        const messageData = await quoteStatsHandler(allMessages);
        const attachment = new AttachmentBuilder('chart.png', {name: 'chart.png'});

        const embed = new EmbedBuilder()
            .setTitle("Zitat Statistiken")
            .setColor(0x9361e4)
            .addFields({
                name: "Geistige Tiefflieger",
                value: messageData.leaderboardString,
                inline: true,
            })
            .setImage('attachment://chart.png');

        await interaction.editReply({embeds: [embed], files: [attachment]});
    },

    name: 'stats',
    description: 'Replies with the stats of "Zitate".',
};