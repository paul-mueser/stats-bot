const divideQuote = require('../utils/divideQuote');

module.exports = async (messages) => {
    if (messages.length === 0) {
        return "No messages found.";
    }
    
    const leaderboard = new Map();
    let leaderboardString = "";

    for (const message of messages) {
        if (!message.createdAt) continue;

        let content = message.content;
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

            let actualAuthor = quoteData.author.trim();

            if (actualAuthor.startsWith('<@') && actualAuthor.endsWith('>')) {
                actualAuthor = actualAuthor.substring(2, actualAuthor.length - 1);
                actualAuthor = global.idNamePairs[actualAuthor];
            }

            if (leaderboard.has(actualAuthor)) {
                const oldVal = leaderboard.get(actualAuthor);
                leaderboard.set(actualAuthor, oldVal + 1);
            } else {
                leaderboard.set(actualAuthor, 1);
            }
        }
    }

    const sortedLeaderboard = new Map([...leaderboard.entries()].sort((a, b) => b[1] - a[1]));

    for (const key of sortedLeaderboard.keys()) {
        if (leaderboardString.length + key.length + sortedLeaderboard.get(key).toString().length >= 4096) {
            break;
        }
        leaderboardString += key + ": " + sortedLeaderboard.get(key) + "\n";
    }

    return leaderboardString;
};