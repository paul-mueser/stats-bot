const handleQuoteRole = require('../../handlers/quoteRoleHandler');

module.exports = async (client, message) => {
    await handleQuoteRole(client, message);
}