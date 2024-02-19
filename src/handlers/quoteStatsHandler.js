const divideQuote = require('../utils/divideQuote');

module.exports = async (messages) => {
    const timeData = Array(24).fill(0);
    const leaderboard = new Map();
    const messageCount = messages.length;
    const maxCounter = 24;
    let timeString = "";
    let leaderboardString = "";

    for (const message of messages) {
        timeData[message.createdAt.getHours()] += 1; // update count for hour of the message

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

            if (leaderboard.has(quoteData.author)) {
                const oldVal = leaderboard.get(quoteData.author);
                leaderboard.set(quoteData.author, oldVal + 1);
            } else {
                leaderboard.set(quoteData.author, 1);
            }
        }
    }

    for (let i = 0; i < timeData.length; i++) {
        const data = timeData[i];
        if (i < 10) {
            timeString += "0";
        }
        //timeString += i + " Uhr: " + "I".repeat(data / messageCount * maxCounter) + "\n";
        timeString += i + " Uhr: " + data + "\n";
    }

    const sortedLeaderboard = new Map([...leaderboard.entries()].sort((a, b) => b[1] - a[1]));

    for (const key of sortedLeaderboard.keys()) {
        leaderboardString += key + ": " + sortedLeaderboard.get(key) + "\n";
    }

    return {timeString, leaderboardString};
};