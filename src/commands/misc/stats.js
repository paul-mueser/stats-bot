const {EmbedBuilder} = require('discord.js');
const fetchAllMessages = require('../../utils/fetchAllMessages');
const quoteMessageHandler = require('../../handlers/quoteMessageHandler');

module.exports = {
    callback: async (client, interaction) => {
        const allMessages = await fetchAllMessages(client, interaction.guild.channels.cache.find(channel => channel.name === 'zitate').id);

        const messageData = await quoteMessageHandler(allMessages);

        const embed = new EmbedBuilder()
            .setTitle("Zitat Statistiken")
            .setColor(0x0000FF)
            .addFields({
                name: "Uhrzeit",
                value: messageData.timeString,
                inline: true,
            }, {
                name: "Geistiger Dünschiss",
                value: messageData.leaderboardString,
                inline: true,
            }); // todo change color

        interaction.reply({embeds: [embed]});
    },

    name: 'stats',
    description: 'Replies with the stats in "Zitate".',
};