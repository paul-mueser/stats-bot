const {EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    callback: async (client, interaction) => {

        const content = interaction.options.get('content').value;
        const author = interaction.options.get('author').value;
        const content2 = interaction.options.get('content2')?.value;
        const author2 = interaction.options.get('author2')?.value;
        const date = interaction.options.get('date').value;

        await interaction.reply('Quote added.');
        await interaction.deleteReply();

        if (content2 && author2) {
            await interaction.channel.send('"' + content + '" ~ [' + author + '] _ "' + content2 + '" ~ [' + author2 + '] | ' + date);
            return;
        }
        await interaction.channel.send('"' + content + '" ~ [' + author + '] | ' + date);
    },

    deleted: true,
    name: 'quote',
    description: 'Replies with the quotes of a specific person.',
    options: [
        {
            name: 'date',
            description: 'When was this said.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'content',
            description: 'The quote content.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'author',
            description: 'Who said this.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'content2',
            description: 'The quote content 2.',
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'author2',
            description: 'Who said this 2.',
            type: ApplicationCommandOptionType.String,
        },
    ],
};