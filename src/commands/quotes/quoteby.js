const {EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder} = require('discord.js');
const fetchAllMessages = require('../../utils/fetchAllMessages');
const quoteContentHandler = require('../../handlers/quoteContentHandler');
const quoteTimeHandler = require('../../handlers/quoteTimeHandler');

module.exports = {
    callback: async (client, interaction) => {
        interaction.deferReply();
        const allMessages = await fetchAllMessages(client, interaction.guild.channels.cache.find(channel => channel.name === 'zitate').id);
        const author = interaction.options.get('author').value;

        let actualAuthor = author.trim();

        if (actualAuthor.startsWith('<@') && actualAuthor.endsWith('>')) {
            actualAuthor = actualAuthor.substring(2, actualAuthor.length - 1);
            actualAuthor = global.idNamePairs[actualAuthor];
        }

        const messageData = await quoteContentHandler(allMessages, actualAuthor);
        await quoteTimeHandler(allMessages, actualAuthor);
        const attachment = new AttachmentBuilder('chart.png', {name: 'chart.png'});

        const embed = new EmbedBuilder()
            .setTitle(`Geistige Tiefflieger von ${actualAuthor}`)
            .setDescription(messageData)
            .setColor(0x9361e4)
            .setImage('attachment://chart.png');

        await interaction.editReply({embeds: [embed], files: [attachment]});
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