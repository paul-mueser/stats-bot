module.exports = (message) => {
    let content = message.content;
    content = content.substring(content.indexOf("~") + 1).trimStart();
    content = content.substring(0, content.indexOf(" "));
    return content;
};