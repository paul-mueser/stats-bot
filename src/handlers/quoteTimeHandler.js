const divideQuote = require('../utils/divideQuote');
const createChartImage = require('../utils/createChartImage');

module.exports = async (messages, author = null) => {
    const timeData = Array(24).fill(0);
    let authorString = author;

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

            if (authorString && authorString !== actualAuthor) {
                continue;
            }

            timeData[message.createdAt.getHours()] += 1; // update count for hour of the message
            break;
        }
    }

    await createChartImage(timeData);
};