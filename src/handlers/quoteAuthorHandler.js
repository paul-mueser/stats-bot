module.exports = async (messages) => {
    const leaderboard = new Map();
    const messageCount = messages.length;
    const maxCounter = 24;
    let leaderboardString = "";

    for (const message of messages) {
        let name = message.member === null ? message.author.displayName : message.member.displayName;
        if (leaderboard.has(name)) {
            const oldVal = leaderboard.get(name);
            leaderboard.set(name, oldVal + 1);
        } else {
            leaderboard.set(name, 1);
        }
    }

    const sortedLeaderboard = new Map([...leaderboard.entries()].sort((a, b) => b[1] - a[1]));

    for (const key of sortedLeaderboard.keys()) {
        leaderboardString += key + ": " + sortedLeaderboard.get(key) + "\n";
    }

    return leaderboardString;
};