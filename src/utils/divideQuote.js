module.exports = (quote) => {
    let content = "";
    let author = "";

    if (quote.indexOf("~") <= -1) {
        return {content, author};
    }

    const data = quote.split("~")

    if (data[0] !== null) {
        content = data[0].trim();
    }
    if (data[1] !== null) {
        author = data[1].substring(data[1].indexOf("[") + 1, data[1].indexOf("]")).trim();
    }

    return {content, author};
};