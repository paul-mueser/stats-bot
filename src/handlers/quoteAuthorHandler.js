module.exports = async (messages) => {
    const leaderboard = new Map();
    let leaderboardString = "";

    for (const message of messages) {
        const author = message.author;
        const name = (await message.guild.members.fetch(message.author)).displayName;
        if (leaderboard.has(author)) {
            const val = leaderboard.get(author).val + 1;
            leaderboard.set(author, {name, val});
        } else {
            const val = 1;
            leaderboard.set(author, {name, val});
        }
    }

    const sortedLeaderboard = new Map([...leaderboard.entries()].sort((a, b) => b[1].val - a[1].val));

    for (const key of sortedLeaderboard.keys()) {
        leaderboardString += sortedLeaderboard.get(key).name + ": " + sortedLeaderboard.get(key).val + "\n";
    }

    return leaderboardString;
};