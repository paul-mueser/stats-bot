module.exports = async (messages) => {
    const leaderboard = new Map();
    let leaderboardString = "";

    for (const message of messages) {
        let author;
        if (!message.author) continue;
        if (message.author.id === global.botId) {
            author = message.content.substring(0, message.content.indexOf(':'));
        } else {
            author = "<@" + message.author.id + ">";
        }
        if (leaderboard.has(author)) {
            const val = leaderboard.get(author) + 1;
            leaderboard.set(author, val);
        } else {
            leaderboard.set(author, 1);
        }
    }

    const sortedLeaderboard = new Map([...leaderboard.entries()].sort((a, b) => b[1] - a[1]));

    for (const key of sortedLeaderboard.keys()) {
        leaderboardString += `${key}: ` + sortedLeaderboard.get(key) + "\n";
    }

    return leaderboardString;
};