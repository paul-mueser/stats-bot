module.exports = async (messages) => {
    if (messages.length === 0) {
        return "No messages found.";
    }
    
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
        if (leaderboardString.length + key.length + sortedLeaderboard.get(key).toString().length >= 4096) {
            break;
        }
        leaderboardString += `${key}: ` + sortedLeaderboard.get(key) + "\n";
    }

    return leaderboardString;
};