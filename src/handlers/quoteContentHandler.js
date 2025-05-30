const divideQuote = require("../utils/divideQuote");

module.exports = async (messages, author) => {
    let returnValue = "";
    const quotes = [];

    for (const message of messages) {
        if (!message) continue;
        let msg = message.content;
        if (!msg) continue;
        if (message.author.id === global.botId) {
            msg = msg.substring(msg.indexOf(":") + 1).trim();
        }
        const barIndex = msg.indexOf("|") > 0 ? msg.indexOf("|") : msg.length;
        let content = msg.substring(0, barIndex).trim();
        let parts = [content];
        if (content.indexOf("_") > -1) {
            parts = content.split("_");
        }
        for (const part of parts) {
            if (part === null) {
                continue;
            }
            const quoteData = divideQuote(part);

            if (quoteData.author.trim() === author) {
                quotes.push("[" + msg.replaceAll("_", ", ") + "](" + message.url + ")");
                break;
            }

            let actualAuthor = quoteData.author.trim();

            if (actualAuthor.startsWith('<@') && actualAuthor.endsWith('>')) {
                actualAuthor = actualAuthor.substring(2, actualAuthor.length - 1);
                if (global.idNamePairs[actualAuthor] === author) {
                    quotes.push("[" + msg + "](" + message.url + ")");
                    break;
                }
            }
        }
    }

    quotes.reverse();

    for (const quote of quotes) {
        if (returnValue.length + quote.length >= 4096) {
            break;
        }
        returnValue += quote + "\n\n";
    }

    return returnValue;
};