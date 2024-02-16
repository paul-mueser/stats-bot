const fetchAllMessages = require('../../utils/fetchAllMessages');

module.exports = {
    name: 'stats',
    description: 'Replies with the stats in "Zitate".',

    callback: async (client, interaction) => {
        await fetchAllMessages(client, "1208019091848171540");
    },
};