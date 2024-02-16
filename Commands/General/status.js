const { Client, 
    SlashCommandBuilder,  
    ActivityType, 
    PermissionFlagsBits, 
} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("set-status")
    .setDescription("Este comando solo lo puede usar mi creador")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(
            option =>
            option.setName("opciones")
            .setDescription("Selecciona una opcion")
            .setRequired(true)
            .addChoices(
                { name: "Viendo", value: "Watching" },
                { name: "Escuchando", value: "Listening" },
                { name: "Jugando", value: "Playing" },
                { name: "Compitiendo", value: "Competing" },
            )
        )
  .addStringOption(
        option =>
        option.setName("contenido")
        .setDescription("Contenido de la actividad")
        .setRequired(true))
  .addStringOption(
        option =>
        option.setName("estado")
        .setDescription("Selecciona el estado del bot")
        .setRequired(false)
        .addChoices(
            { name: "Online", value: "online" },
            { name: "Ausente", value: "idle" },
            { name: "No molestar", value: "dnd" },
            { name: "Invisible", value: "invisible" },
        )),
  
   
    async execute(interaction, client) {
        const { options } = interaction;

         if (interaction.user.id !== '937341470933942293') /* ID DEL CONFIGURADOR */
         return interaction.reply({ 
            content: ':x: | Este comando solo lo puede usar mi creador', 
         ephemeral: true }); /* lo que hace esto es para que solo ustedes usen el comando */


       await interaction.reply({
        content: "[✓] Se actualizo el estado con exito", 
        ephemeral: true}) /* Esto se mandara cuando el comando si funciono */
    },
};



