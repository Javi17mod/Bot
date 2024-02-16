const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("My Channel URL")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute(interaction){
        interaction.reply({content: "╔══╡ https://www.youtube.com/@javi17mod ╞══╗", ephemeral:false})
    }
};
