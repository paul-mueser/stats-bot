const {EmbedBuilder} = require('discord.js');
const fetchAllMessages = require('../../utils/fetchAllMessages');
const serverAuthorStatsHandler = require('../../handlers/serverAuthorStatsHandler');

module.exports = {
    callback: async (client, interaction) => {
        let retVal = "";
        for (const channel of interaction.guild.channels.cache) {
            const allMessages = await fetchAllMessages(client, interaction.guild.channels.cache.find(channel => channel.name === 'zitate').id);

            const messageData = await serverAuthorStatsHandler(allMessages);

            retVal += messageData + "\n";
        }

        const embed = new EmbedBuilder()
            .setTitle("Zitat Statistiken")
            .setColor(0x9361e4)
            .addFields({
                name: "Author Stats",
                value: retVal,
            });

        interaction.reply({embeds: [embed]});
    },

    name: 'authorStatsServer',
    description: 'Replies with the stats of all authors of the server.',
};