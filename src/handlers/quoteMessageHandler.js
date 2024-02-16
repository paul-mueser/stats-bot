const quoteContentHandler = require('../handlers/quoteContentHandler');

module.exports = (messages) => {
    const timeData = Array(24).fill(0);
    const leaderboard = new Map();

    for (const message of messages) {
        timeData[message.createdAt.getHours()] += 1; // update count for hour of the message
        const name = quoteContentHandler(message);
        if (leaderboard.has(name)) {
            const oldVal = leaderboard.get(name);
            leaderboard.set(name, oldVal + 1);
        } else {
            leaderboard.set(name, 1);
        }
    }

    const sortedLeaderboard = new Map([...leaderboard.entries()].sort((a, b) => b[1] - a[1]));

    return {timeData, sortedLeaderboard};
};