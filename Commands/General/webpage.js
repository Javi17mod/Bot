const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js')

module.exports = {
 data: new SlashCommandBuilder()
  .setName("webpage")
  .setDescription("My webpage URL")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
 execute(interaction) {
  interaction.reply({ content: "╔══╡ https://javi17mod.github.io ╞══╗", ephemeral: false })
 }
};
