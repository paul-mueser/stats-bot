const fetchAllMessages = require('../../utils/fetchAllMessages');
const { startOfWeek, endOfWeek } = require('date-fns');
const divideQuote = require("../../utils/divideQuote");
const {quoteLeaderRoleName} = require('../../../config.json');

module.exports = async (client, message) => {
    if (!message.inGuild() || message.channel.id !== message.guild.channels.cache.find(channel => channel.name === 'zitate').id) return;

    let role = message.guild.roles.cache.find(role => role.name === quoteLeaderRoleName);
    if (!role) return;

    message.guild.roles.create({
        name: role.name,
        color: role.color,
        hoist: role.hoist,
        position: role.position,
        permissions: role.permissions,
        mentionable: role.mentionable
    });

    role.delete('I had to.');

    let messages = await fetchAllMessages(client, message.guild.channels.cache.find(channel => channel.name === 'zitate').id);

    const date = new Date();
    const start = startOfWeek(date, {weekStartsOn: 1});
    const end = endOfWeek(date, {weekStartsOn: 1});

    const leaderboard = new Map();

    for (const m of messages) {
        if (m.createdTimestamp < start || m.createdTimestamp > end) continue;
        if (!m.content) continue;

        let content = m.content;
        if (m.author.id === global.botId) {
            content = content.substring(content.indexOf(":") + 1).trim();
        }

        const barIndex = content.indexOf("|") > 0 ? content.indexOf("|") : content.length;
        content = content.substring(0, barIndex);
        let parts = [content];
        if (content.indexOf("_") > -1) {
            parts = content.split("_");
        }
        for (const part of parts) {
            if (part === null) {
                continue;
            }
            const quoteData = divideQuote(part);
            let author = quoteData.author.trim();

            if (leaderboard.has(author)) {
                const oldVal = leaderboard.get(author);
                leaderboard.set(author, oldVal + 1);
            } else {
                leaderboard.set(author, 1);
            }
        }
    }

    const sortedLeaderboard = new Map([...leaderboard.entries()].sort((a, b) => b[1] - a[1]));
    let author = sortedLeaderboard.keys().next().value;

    if (author.startsWith('<@') && author.endsWith('>')) {
        author = author.substring(2, author.length - 1);
        let leader = await message.guild.members.cache.get(author);
        role = message.guild.roles.cache.find(role => role.name === quoteLeaderRoleName);
        try {
            await leader.roles.add(role);
        } catch (e) {}
    }
}