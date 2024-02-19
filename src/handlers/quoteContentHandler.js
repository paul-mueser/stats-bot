const divideQuote = require("../utils/divideQuote");
module.exports = async (messages, author) => {
    let returnValue = "";
    const quotes = [];

    for (const message of messages) {
        const msg = message.content;
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

            if (quoteData.author === author) {
                quotes.push(msg.replaceAll("_",", "));
                break;
            }
        }
    }

    quotes.reverse();

    for (const quote of quotes) {
        returnValue += quote + "\n\n";
    }

    return returnValue;
};