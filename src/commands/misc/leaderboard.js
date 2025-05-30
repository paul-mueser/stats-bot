const {EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');
const fetchAllMessages = require('../../utils/fetchAllMessages');
const serverAuthorStatsHandler = require('../../handlers/leaderboardHandler');

module.exports = {
    callback: async (client, interaction) => {
        await interaction.deferReply();
        let retVal = new Map();
        let authorString = "";
        let leaderboardString = "";

        let ignoredChannels = [];
        if (interaction.options.getString('ignored-channels')) {
            ignoredChannels = interaction.options.getString('ignored-channels').split(',').map(channel => channel.trim());
        }

        for (const channel of interaction.guild.channels.cache) {
            if (ignoredChannels.includes(channel[1].name)) {
                continue;
            }
            if (channel[1].type !== 0 && channel[1].type !== 2) {
                continue;
            }

            const allMessages = await fetchAllMessages(client, channel[0]);

            const messageData = await serverAuthorStatsHandler(allMessages);

            for (const key of messageData.keys()) {
                let found = false;
                for (const retKey of retVal.keys()) {
                    if (key.id === retKey.id) {
                        const val = retVal.get(retKey) + messageData.get(key);
                        retVal.set(retKey, val);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    retVal.set(key, messageData.get(key));
                }
            }
        }
        
        if (retVal.size === 0) {
            await interaction.editReply("No messages found.");
            return;
        }

        const sortedLeaderboard = new Map([...retVal.entries()].sort((a, b) => b[1] - a[1]));

        for (const key of sortedLeaderboard.keys()) {
            if (!await interaction.guild.members.fetch(key.id).then(() => true).catch(() => false)) {
                continue;
            }
            if (authorString.length + key.length >= 1014) {
                break;
            }
            if (leaderboardString.length + sortedLeaderboard.get(key).toString().length >= 1014) {
                break;
            }

            authorString += `${key}:\n`;
            leaderboardString += sortedLeaderboard.get(key) + "\n";
        }

        const embed = new EmbedBuilder()
            .setTitle("Leaderboard")
            .setColor(0x9361e4)
            .addFields({
                name: "Author",
                value: authorString,
                inline: true,
            }, {
                name: "Message count",
                value: leaderboardString,
                inline: true,
            });

        await interaction.editReply({embeds: [embed]});
    },

    name: 'leaderboard',
    description: 'Replies with leaderboard of written messages on the server.',
    options: [
        {
            name: 'ignored-channels',
            description: 'List all channel names (comma seperated) to ignore here.',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
};