const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('md')
    .setDescription('Enviar un MD')
    .setDMPermission(false)
    .addUserOption(option =>
        option.setName('user')
          .setDescription('User')
          .setRequired(true))
    .addStringOption(option =>
        option.setName('message')
          .setDescription('Send')
          .setRequired(true)),
  async execute(interaction) {
// Role name in-between the '' 
    if (interaction.member.roles.cache.every(r => r.name !== 'Can DM🟩')) 
// Role name goes between the ** **
    return await interaction.reply('You need the **Can DM🟩** role to use this command.');
    await interaction.deferReply();
    const member = interaction.options.getUser('user');
    const message = interaction.options.getString('message');

    const msgEmbed = new EmbedBuilder()
      .setColor("Red")
      .setTitle('New message')
      .setDescription(`${message}`)
      .setTimestamp()
      .setFooter({ text: 'By Javi17mod' });

      const row = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
    .setCustomId('Via')
    .setLabel(`Sended by ${interaction.user.tag}`)
    .setDisabled(true)
    .setStyle(ButtonStyle.Primary),
  new ButtonBuilder()
  .setCustomId('messageserver')
    .setLabel(`From ${interaction.guild} server`)
    .setDisabled(true)
    .setStyle(ButtonStyle.Secondary));
let sendmsg = await member.send({ embeds: [msgEmbed], components: [row] }).catch((err) => { return console.log(`Failed to DM ${member.tag} | ${err}`) });
    if (sendmsg) {
      await interaction.channel.sendTyping(),
        await interaction.editReply(`DM sended!`)
    } else if (!sendmsg) {
        await interaction.channel.sendTyping(),
      interaction.editReply(`Couldn't send a message to ${member.tag}`)
    }
  },
};