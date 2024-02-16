const { 
    EmbedBuilder,
    SlashCommandBuilder,
    ChannelType,
} = require("discord.js");
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("Tienda"),
    execute(interaction, client) {
        const { guild } = interaction;
        const { createdTimestamp, ownerId, description, members, memberCount, premiumTier, premiumSubscriptionCount } = guild;
        const getChannelTypeSize = type => client.channels.cache.filter(channel => type.includes(channel.type)).size;
        const icon = guild.iconURL();
 
        const embed1 = new EmbedBuilder()
                .setAuthor({ name: `Tienda`, iconURL: `${interaction.guild.iconURL({dynamic: true, size: 1024})}`})
                .setDescription(`@${interaction.user.tag}`)
                .setFields(
                    {
                        name: "Method of Infinite Nitro",
                        value: [
                            `**15 invites** \n **1 Boost** \n`,
                        ].join("\n \n ")
                    },
                    {
                        name: "Modifications of Discord Account",
                        value: [
                            `**Discord Account 24/7 __(With problems)__** = 10 invites \n **Discord Account 24/7 __(Without problems)__** = 1 Boost \n`,
                       ].join("\n \n")
                    },
                    {
                        name: "Embed Creator Command",
                        value: [
                            `**10 invites** \n **1 Boost** \n`,
                       ].join("\n \n")
                    },
                    {
                        name: "Social Platforms",
                        value: [
                            `**YouTube** 2 invites \n **Join Discord Server** 1 invite `,
                       ].join("\n \n")
                    },
                  {
                    name: "Bot commands",
                    value: [
                      `25 invites = Estado personalizado para bot \n 2 boost     = Estado personalizado para bot`,
                    ].join("\n \n")
                  },
                )
                .setFooter({ text: `Solicitado por ${interaction.user.tag}`})
                .setThumbnail(`https://th.bing.com/th/id/OIP.I2_FVVzabVRK4peGTMhMUAHaHa?pid=ImgDet&rs=1`)
                .setColor(0xf800b9)
            interaction.reply({ embeds: [embed1]});
    }
};