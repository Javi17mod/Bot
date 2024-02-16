const { 
    EmbedBuilder,
    SlashCommandBuilder,
    ChannelType,
} = require("discord.js");
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Ayuda o info"),
    execute(interaction, client) {
        const { guild } = interaction;
        const { createdTimestamp, ownerId, description, members, memberCount, premiumTier, premiumSubscriptionCount } = guild;
        const getChannelTypeSize = type => client.channels.cache.filter(channel => type.includes(channel.type)).size;
        const icon = guild.iconURL();
 
        const embed = new EmbedBuilder()
                .setAuthor({ name: `Help`, iconURL: `${interaction.guild.iconURL({dynamic: true, size: 1024})}`})
                .setDescription(`@${interaction.user.tag}`)
                .setFields(
                    {
                        name: "Commands 🔧",
                        value: [
                            `You can use this commands: \n \n ◉ ┋ </youtube:1114140647553765484> \n ◉ ┋ </radio:1115391683304116315> \n ◉ ┋ </webpage:1114140647553765483> \n ◉ ┋ </user-info:1115213024609959946> \n ◉ ┋ </server:1115155502687592458> \n ◉ ┋ </shop:1115954834588303401>`,
                        ].join("\n \n ")
                    },
                    {
                        name: "Creador 🛠️",
                        value: [
                            `**﹝Javi17mod - ⌬﹞** \n [╔╦𝗪𝗲𝗯𝗣𝗮𝗴𝗲🌐](https://javi17mod.github.io)  \n    [╚╣𝗬𝗼𝘂𝗧𝘂𝗯𝗲 🎦](https://www.youtube.com/channel/UCDWflviULB2iZK2Bb5TEIkg?sub_confirmation=1)   \n   [⦿║ 𝗥𝗮𝗱𝗶𝗼 📻](http://stream.zeno.fm/ivarge8h6egvv) \n [╔╣𝗦𝘂𝗽𝗽𝗼𝗿𝘁](https://discord.gg/pafe9JrVqG) \n [╚╩𝗜𝗻𝘃𝗶𝘁𝗲🤖](https://discord.com/api/oauth2/authorize?client_id=1108807823497891941&permissions=8&scope=bot) \n`,
                       ].join("\n \n")
                    },
                    {
                        name: "BOT info",
                        value: [
                            `Programmed by **〈Javi17mod#0001 ⌈<:slash_command:1110567238517399602>⌋〉** \n Version: 0.8`,
                       ].join("\n \n")
                    },
                )
                .setFooter({ text: `Solicitado por ${interaction.user.tag}`})
                .setThumbnail(`https://www.logolynx.com/images/logolynx/fc/fc911851808c7fb1dad31419e15715f3.png`)
                .setColor(0x00b6f8)
            interaction.reply({ embeds: [embed]});
    }
};