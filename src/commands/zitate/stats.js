const {EmbedBuilder} = require('discord.js');
const fetchAllMessages = require('../../utils/fetchAllMessages');
const quoteStatsHandler = require('../../handlers/quoteStatsHandler');

module.exports = {
    callback: async (client, interaction) => {
        const allMessages = await fetchAllMessages(client, interaction.guild.channels.cache.find(channel => channel.name === 'zitate').id);

        const messageData = await quoteStatsHandler(allMessages);

        const embed = new EmbedBuilder()
            .setTitle("Zitat Statistiken")
            .setColor(0x9361e4)
            .addFields({
                name: "Uhrzeit",
                value: messageData.timeString,
                inline: true,
            }, {
                name: "Geistige Tiefflieger",
                value: messageData.leaderboardString,
                inline: true,
            });

        interaction.reply({embeds: [embed]});
    },

    name: 'stats',
    description: 'Replies with the stats of "Zitate".',
};