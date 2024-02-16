const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('convertir')
    .setDescription('Convierte una cantidad de una moneda a otra.')
    .addNumberOption(option => option
      .setName('cantidad')
      .setDescription('La cantidad a convertir.')
      .setRequired(true)
    )
    .addStringOption(option => option
      .setName('moneda_origen')
      .setDescription('La moneda de origen.')
      .setRequired(true)
    )
    .addStringOption(option => option
      .setName('moneda_destino')
      .setDescription('La moneda de destino.')
      .setRequired(true)
    ),

  async execute(interaction) {
    const cantidad = interaction.options.getNumber('cantidad');
    const monedaOrigen = interaction.options.getString('moneda_origen');
    const monedaDestino = interaction.options.getString('moneda_destino');

    // Llama a la API de conversión de monedas
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${monedaOrigen}`);
    const data = await response.json();

    if (data.result === 'error') {
      // Si hay un error en la API, muestra un mensaje de error
      return interaction.reply({ content: 'No se puede obtener la información de conversión en este momento. Por favor, intenta de nuevo más tarde.', ephemeral: true });
    }

    if (!data.rates[monedaDestino]) {
      // Si la moneda de destino no es válida, muestra un mensaje de error
      return interaction.reply({ content: 'La moneda de destino no es válida. Por favor, verifica la moneda e intenta de nuevo.', ephemeral: true });
    }

    // Calcula la conversión de moneda
    const resultado = cantidad * data.rates[monedaDestino];

    // Crea el embed con el resultado
    const embed = new EmbedBuilder()
      .setColor('RANDOM')
      .setTitle('Conversión de moneda')
      .addField('Cantidad', `${cantidad} ${monedaOrigen}`)
      .addField('Resultado', `${resultado} ${monedaDestino}`);

    // Envía el embed al canal de interacción
    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};