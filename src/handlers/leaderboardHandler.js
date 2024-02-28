module.exports = async (messages) => {
    const leaderboard = new Map();

    for (const message of messages) {
        if (!message) continue;
        if (!message.author) continue;
        const author = message.author;
        if (author.bot) continue;
        if (leaderboard.has(author)) {
            const val = leaderboard.get(author) + 1;
            leaderboard.set(author, val);
        } else {
            leaderboard.set(author, 1);
        }
    }

    return leaderboard;
};