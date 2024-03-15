const {EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');
const fetchAllMessages = require('../../utils/fetchAllMessages');
const quoteContentHandler = require('../../handlers/quoteContentHandler');

module.exports = {
    callback: async (client, interaction) => {
        interaction.deferReply();
        const allMessages = await fetchAllMessages(client, interaction.guild.channels.cache.find(channel => channel.name === 'zitate').id);
        const author = interaction.options.get('author').value;

        const messageData = await quoteContentHandler(allMessages, author);

        const embed = new EmbedBuilder()
            .setTitle(`Geistige Tiefflieger von ${author}`)
            .setDescription(messageData)
            .setColor(0x9361e4);

        await interaction.editReply({embeds: [embed]});
    },

    name: 'quoteby',
    description: 'Replies with the quotes of a specific person.',
    options: [
        {
            name: 'author',
            description: 'The author of the quote.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
};