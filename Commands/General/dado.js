const Discord = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('dado')
  .setDescription('Tira un dado'),

  execute(interaction) {
   const { options } = interaction;
   let rpts = [`◉`, `◦◦`,` :. `,`⁘`,`⁙`,` ⁝⁝ `]
   let color = [`DarkButNotBlack`, `White`]
     const dado = new EmbedBuilder()
     .setColor(`${color[Math.floor(Math.random() * color.length)]}`)
     .setTitle(`Tirando una dado `)
     .setImage(`https://www.imagensanimadas.com/data/media/710/dado-imagem-animada-0090.gif`)
     .addFields(
        {name: `${interaction.user.tag} le ha tocado`, value: `┏━━┓ \n┃${rpts[Math.floor(Math.random() * rpts.length)]}  ┃ \n┗━━┛`}
     )

     interaction.channel.send({ embeds: [dado]});
     interaction.reply({ content: `dado tirado`,  ephemeral: true })

  },

};