module.exports = async (client, channelId) => {
    const channel = client.channels.cache.get(channelId);
    let messages = [];

    // Create message pointer
    let message = await channel.messages;
    if (message) {
        message = message.fetch({ limit: 1 })
            .then(messagePage => (messagePage.size === 1 ? messagePage.first() : null));
    } else {
        return messages;
    }

    messages.push(message);

    while (message) {
        await channel.messages
            .fetch({ limit: 100, before: message.id })
            .then(messagePage => {
                messagePage.forEach(msg => messages.push(msg));

                // Update our message pointer to be the last message on the page of messages
                message = 0 < messagePage.size ? null : messagePage.last();
            });
    }

    return messages;
};