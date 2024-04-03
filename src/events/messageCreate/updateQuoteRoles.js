const { Client, Message } = require('discord.js')
const fetchAllMessages = require('../../utils/fetchAllMessages');
const { startOfWeek, endOfWeek } = require('date-fns');
const divideQuote = require("../../utils/divideQuote");

module.exports = async (client, message) => {
    if (!message.inGuild() || message.channel.id !== message.guild.channels.cache.find(channel => channel.name === 'zitate').id) return;

    let role = message.guild.roles.cache.find(role => role.name === "Rüdiger");
    if (!role) return;

    message.guild.roles.create({
        name: role.name,
        color: role.color,
        hoist: role.hoist,
        position: role.position,
        permissions: role.permissions,
        mentionable: role.mentionable
    });

    console.log(role);
    role.delete('I had to.');

    let leader = message.guild.members.cache.get(message.author.id);

    let messages = await fetchAllMessages(client, message.guild.channels.cache.find(channel => channel.name === 'zitate').id);

    const date = new Date();
    const start = startOfWeek(date, {weekStartsOn: 1});
    const end = endOfWeek(date, {weekStartsOn: 1});

    const leaderboard = new Map();

    for (const m of messages) {
        if (m.createdTimestamp < start || m.createdTimestamp > end) continue;
        if (!m.content) continue;

        let content = m.content;
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

            if (leaderboard.has(quoteData.author)) {
                const oldVal = leaderboard.get(quoteData.author);
                leaderboard.set(quoteData.author, oldVal + 1);
            } else {
                leaderboard.set(quoteData.author, 1);
            }
        }
    }

    const sortedLeaderboard = new Map([...leaderboard.entries()].sort((a, b) => b[1] - a[1]));
    const key = sortedLeaderboard.keys()[0];
    leader = key;
    // todo leader is author string (who said it) so we need to get the member object from the guild if possible
    role = message.guild.roles.cache.find(role => role.name === "Rüdiger");
    //await leader.roles.add(role);
}