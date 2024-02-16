const { SlashCommandBuilder } = require(`@discordjs/builders`);
// haga un comando de barra que obtendrá la información de emoji del usuario

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`emoji-info`)
    .setDescription(`Obtiene información de emoji`)
    .addStringOption((option) =>
      option.setName(`emoji`).setDescription(`El emoji`).setRequired(true)
    ),
  async execute(interaction, client) {
    // obtener el emoji
    const emoji = interaction.options.getString(`emoji`);
    // si el emoji no es un emoji personalizado
    if (!emoji.startsWith(`<`))
      return interaction.reply({
        content: `¡Proporcione un emoji personalizado!`,
        ephemeral: true,
      });
    // obtener la identificación emoji
    const emojiid = emoji.split(`:`)[2].slice(0, -1);
    // obtener la URL del emoji
    const emojiurl = `https://cdn.discordapp.com/emojis/${emojiid}.png`;
    // enviar una respuesta
            const emojiembed = new EmbedBuilder()
            .setAuthor({ name: `${emoji}` })
            .setTitle(`<:slash_command:1111212018976956446> 𝚂𝚈𝚂𝚃𝙴𝙼 𝚘𝚏 𝙹𝚊𝚟𝚒𝟷𝟽𝚖𝚘𝚍 <:slash_command:1110567238517399602> \n ╒═════𝕌𝕡𝕕𝕒𝕥𝕖 ${title} ═════╕`)
            .setColor(`${colour}`)
            .setDescription(`${message}`)
            .setThumbnail(`https://images.vexels.com/media/users/3/132081/isolated/preview/c408b45143508d446ba8ededa238929b-ajustes-del-icono-del-c-rculo-by-vexels.png`)

    interaction.reply({content: `**Emoji Info**\n\n**Nombre:** ${emoji}\n**ID:** ${emojiid}\n**URL:** [URL](${emojiurl})`,
      ephemeral: true,
    });
  },
};