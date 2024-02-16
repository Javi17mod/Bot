const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName("bot")
        .setDescription("Bot information"),
    execute(interaction, client) {
        const { guild } = interaction;
        const getChannelTypeSize = type => client.channels.cache.filter(channel => type.includes(channel.type)).size;
        const serverslist = interaction.client.guilds.cache.map(guild => `> **-** ${guild.name} \`(ID: ${guild.id})\``);
     const icon = guild.iconURL();
      
        const pag1 = new EmbedBuilder()
                .setAuthor({ name: `Bot`, iconURL: `${interaction.guild.iconURL({dynamic: true, size: 1024})}`})
                .setTitle("Bot information")
                .setDescription("📁\n┣📁Created \n <:slash_command:1116650195942395934>┗🗒️ <t:1684396800:R>\n┣📁Name\n <:slash_command:1116650195942395934>┣🗒️ Javi17mod#1401 \n <:slash_command:1116650195942395934>┗🗒️ Developer Javi17mod#0001\n┗📁Information\n <:slash_command:1116650195942395934>┣🗒️ `13` commands\n <:slash_command:1116650195942395934>┗🗒️ Default server `Javi17mod` \n ┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛")
                .setFooter({ text: `requested by ${interaction.user.tag}`})
                .setThumbnail(`https://wallpapercave.com/wp/wp8761712.jpg`)
                .setColor(0x7289da)
                .setImage("https://i.ibb.co/9yhvSq2/IMG-2145.jpg")
            const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
           .setCustomId('1')
           .setLabel(`1`)
           .setDisabled(false)
             .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
           .setCustomId('2')
           .setLabel(`2`)
           .setDisabled(false)
           .setStyle(ButtonStyle.Danger),
           new ButtonBuilder()
           .setCustomId('3')
           .setLabel(`3`)
           .setDisabled(false)
           .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
           .setLabel(`🤖Invite Me`)
           .setDisabled(false)
           .setStyle(ButtonStyle.Link)
           .setURL("https://discord.com/api/oauth2/authorize?client_id=1108807823497891941&permissions=8&scope=bot"),
            new ButtonBuilder()
           .setLabel(`🌐WebPage`)
           .setDisabled(false)
           .setURL("https://javi17mod.github.io")
           .setStyle(ButtonStyle.Link));
                  client.on('interactionCreate', interaction => {

    if (!interaction.isButton()) return;

    if (interaction.customId == "2") {
       interaction.update({
         ephemeral: false,
         embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `Bot`, iconURL: `${interaction.guild.iconURL({dynamic: true, size: 1024})}`})
                .setTitle("Owner information")
                .setDescription("**Owner** <@937341470933942293> \n **Joined** <t:1656154920:R> \n **Account created** <t:1643557140:R>")
                .setFooter({ text: `requested by ${interaction.user.tag}`})
                .setThumbnail(`https://wallpapercave.com/wp/wp8761712.jpg`)
                .setColor(0xff0000)
                .setImage("https://i.ibb.co/9yhvSq2/IMG-2145.jpg")
         ]
       })
    }
          if (!interaction.isButton()) return;
        if (interaction.customId == "1") {
       interaction.update({
         ephemeral: false,
         embeds: [pag1]
       })
    }
              if (!interaction.isButton()) return;
              if (interaction.customId == "3")
                interaction.update({
                  ephemeral: false,
                  embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Bot`, iconURL: `${interaction.guild.iconURL({dynamic: true, size: 1024})}`})
            .setTitle('List of servers')
            .setDescription(`The bot is in the next servers:\n${serverslist.join('\n')}`)
            .setFooter({ text: `requested by ${interaction.user.tag}`})
            .setThumbnail(`https://wallpapercave.com/wp/wp8761712.jpg`)
            .setColor(0x7289da)
            .setImage("https://i.ibb.co/9yhvSq2/IMG-2145.jpg")
              ]
            })

});
            interaction.reply({ embeds: [pag1], components: [row2], })
    }
}