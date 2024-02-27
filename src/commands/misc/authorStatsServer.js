const {EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');
const fetchAllMessages = require('../../utils/fetchAllMessages');
const serverAuthorStatsHandler = require('../../handlers/serverAuthorStatsHandler');

module.exports = {
    callback: async (client, interaction) => {
        let retVal = "";

        let ignoredChannels = [];
        if (interaction.options.getString('ignored channels')) {
            ignoredChannels = interaction.options.getString('ignored channels').split(',').map(channel => channel.trim());
        }

        for (const channel of interaction.guild.channels.cache) {
            if (ignoredChannels.includes(channel[1].name)) {
                continue;
            }

            const allMessages = await fetchAllMessages(client, channel[1].id);

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
    options: [
        {
            name: 'ignored channels',
            description: 'List all channel names to ignore here.',
            type: ApplicationCommandOptionType.String,
        },
    ],
};