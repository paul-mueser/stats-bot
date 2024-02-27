const {EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');
const fetchAllMessages = require('../../utils/fetchAllMessages');
const serverAuthorStatsHandler = require('../../handlers/serverAuthorStatsHandler');

module.exports = {
    callback: async (client, interaction) => {
        let retVal = new Map();
        let leaderboardString = "";

        let ignoredChannels = [];
        if (interaction.options.getString('ignored-channels')) {
            ignoredChannels = interaction.options.getString('ignored-channels').split(',').map(channel => channel.trim());
        }

        for (const channel of interaction.guild.channels.cache) {
            if (ignoredChannels.includes(channel[1].name)) {
                continue;
            }

            const allMessages = await fetchAllMessages(client, channel[0]);

            const messageData = await serverAuthorStatsHandler(allMessages);

            for (const key of messageData.keys()) {
                if (retVal.has(key)) {
                    const val = retVal.get(key) + messageData.get(key);
                    retVal.set(key, val);
                } else {
                    retVal.set(key, messageData.get(key));
                }
            }
        }

        const sortedLeaderboard = new Map([...retVal.entries()].sort((a, b) => b[1] - a[1]));

        for (const key of sortedLeaderboard.keys()) {
            leaderboardString += `${key}: ` + sortedLeaderboard.get(key) + "\n";
        }

        const embed = new EmbedBuilder()
            .setTitle("Zitat Statistiken")
            .setColor(0x9361e4)
            .addFields({
                name: "Author Stats",
                value: leaderboardString,
            });

        interaction.reply({embeds: [embed]});
    },

    name: 'ass',
    description: 'Replies with the stats of all authors of the server.',
    options: [
        {
            name: 'ignored-channels',
            description: 'List all channel names to ignore here.',
            type: ApplicationCommandOptionType.String,
        },
    ],
};