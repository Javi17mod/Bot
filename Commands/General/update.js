const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('Publish an update')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option => option.setName('channel').setDescription('channel').addChannelTypes(ChannelType.GuildText).setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('@announcements').setRequired(true))
        .addStringOption(option => option.setName('title').setDescription('version of update').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('Things').setRequired(true))
        .addStringOption(option => option.setName('colour').setDescription('Color de la inserción (no requerido)').setRequired(true))
        .addStringOption(option => option.setName('image').setDescription('Imagen de la inserción (no requerida)').setRequired(false)),
    async execute(interaction) {
        const { options } = interaction;

        const channel = options.getChannel('channel');
        const role = options.getRole('role');
        const title = options.getString('title');
        const message = options.getString('message');
        const colour = options.getString('colour') || "DarkButNotBlack";
        const image = options.getString('image') || null;

        const embed = new EmbedBuilder()
            .setAuthor({ name: `Javi17mod`, iconURL: `${interaction.guild.iconURL({dynamic: true, size: 1024})}`})
            .setTitle(`<:slash_command:1111212018976956446> 𝚂𝚈𝚂𝚃𝙴𝙼 𝚘𝚏 𝙹𝚊𝚟𝚒𝟷𝟽𝚖𝚘𝚍 <:slash_command:1110567238517399602> \n ╒═════𝕌𝕡𝕕𝕒𝕥𝕖 ${title} ═════╕`)
            .setColor(`${colour}`)
            .setDescription(`${message}`)
            .setThumbnail(`https://images.vexels.com/media/users/3/132081/isolated/preview/c408b45143508d446ba8ededa238929b-ajustes-del-icono-del-c-rculo-by-vexels.png`)
            .setFields(
              {
                name: "||Ping||",
                value: [
          `||${role}||`
                ].join("\n")
              },
            )
      const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel("WebPage 🌐")
            .setStyle(ButtonStyle.Link)
            .setURL("https://javi17mod.github.io")
            .setDisabled(false),
            new ButtonBuilder()
            .setLabel("Suscribe ▶️")
            .setStyle(ButtonStyle.Link)
            .setURL("https://www.youtube.com/channel/UCDWflviULB2iZK2Bb5TEIkg?sub_confirmation=1")
            .setDisabled(false),
            new ButtonBuilder()
           .setCustomId('javi17mod')
           .setLabel(`Javi17mod | Bot v${title}`)
           .setDisabled(false)
           .setStyle(ButtonStyle.Danger));
        await channel.send({ embeds: [embed], components: [row1], })
        await interaction.reply({ content: `Anuncio enviado a ${channel}`, ephemeral:true })
    }
}