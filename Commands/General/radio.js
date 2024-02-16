const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("radio")
    .setDescription("My Radio 24/7 URL")
    .setDefaultMemberPermissions(PermissionFlagsBits.ViewChannel),
    execute(interaction){
        interaction.reply({content: "╔══╡ https://javi17mod.github.io/Radio/ ╞══╗", ephemeral:false})
    }
};
