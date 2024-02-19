module.exports = async (messages, author) => {
    let returnValue = "";

    for (const message of messages) {

        let name = message.content;
        const tildIndex = name.indexOf("~");
        name = name.substring(tildIndex + 1).trimStart();
        name = name.substring(0, name.indexOf(" "));
        if (name.includes(",")) {
            name = name.substring(0, name.indexOf(","));
        }

        if (name === author) {
            returnValue += message.content + "\n";
        }
    }

    return returnValue;
};