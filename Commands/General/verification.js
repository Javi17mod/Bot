const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("verify")
        .setDescription("verification"),
    execute(interaction, client) {
        const { guild } = interaction;
        const icono = guild.iconURL();

        const verificator = new EmbedBuilder()
                .setAuthor({ name: `Bot`, iconURL: `${interaction.guild.iconURL({dynamic: true, size: 1024})}`})
                .setDescription(`Click **Verification** to verificate you of non robot`)
                .setColor(0x09ed19)
            const verfi = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
           .setCustomId(`verifs`)
           .setLabel(`Verification`)
           .setDisabled(false)
           .setStyle(ButtonStyle.Success));
      client.on('interactionCreate', interaction => {

    if (!interaction.isButton()) return;

    if (interaction.customId == "verifs") {
      const member = interaction.member;

    // Obtener el rol que deseas asignar
    const role = member.guild.roles.cache.find(role => role.name === '✅');

    // Asignar el rol al miembro
    member.roles.add(role)
      interaction.reply({content:`You have verified succesfully with ✅ role, enjoy`, ephemeral: true})
    }

});
            interaction.reply({ embeds: [verificator], components: [verfi], })
    }
};