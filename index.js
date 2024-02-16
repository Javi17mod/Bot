const { Client, ButtonBuilder, ButtonStyle, EmbedBuilder, Intents, ActivityType, ChannelType, GatewayIntentBits, Partials, Collection, ActionRowBuilder, StringSelectMenuBuilder, Permissions, ButtonStyles, MessageManager, Embed, PermissionsBitField } = require('discord.js')
const fs = require('fs');
const path = require('path');
const { KeepAlive } = require("./keep_alive");
const {loadEvents} = require('./Handlers/eventHandler');
const {loadCommands} = require('./Handlers/commandHandler');
const Discord = require('discord.js');
const client = new Client({
    intents:[Object.keys(GatewayIntentBits)],
    partials:[Object.keys(Partials)]
});
let statused = '';
const filePath = 'settings/config.txt';

// Variable para almacenar el valor de prefix
let prefix;

// Leer el archivo línea por línea
try {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

    // Evaluar cada línea como una expresión de JavaScript
    lines.forEach((line) => {
        try {
            // Separar la línea en partes (por ejemplo, "prefix = -")
            const [variable, expression] = line.split('=');

            // Eliminar espacios en blanco y evaluar la expresión
            const trimmedVariable = variable.trim();
            const trimmedExpression = expression.trim();
            if (trimmedVariable === 'prefix') {
                // Si la variable es 'prefix', asignar el valor evaluado a la variable del código
                prefix = eval(trimmedExpression);
            }
        } catch (error) {
            console.error(`Error al procesar la línea: "${line}" - ${error.message}`);
        }
    });
} catch (error) {
    console.error(`Error al leer el archivo: ${error.message}`);
}


client.commands = new Collection();
client.config = require('./config.json');
client.on('ready', () => {
    client.user.setActivity('Turning ON', { type: ActivityType.Custom });
        client.user.setPresence({status: 'dnd'});
});
    let status = [{ name: '4 commands', type: ActivityType.Custom },{ name: 'Diresnode Bot', type: ActivityType.Custom }];

let currentIndex = 0; 
setInterval(() => {
    client.user.setPresence({status: 'idle'});
  if (currentIndex >= status.length) {
    currentIndex = 0;
  }
  client.user.setActivity(status[currentIndex]);
  currentIndex++;
}, 10000); 
// PREFIXED COMMANDS
client.on('messageCreate', (message) => {
if (message.mentions.users.size > 0) {
        // Obtener el primer usuario mencionado (generalmente el autor del mensaje)
        const mentionedUser = message.mentions.users.first();

        // Verificar si el usuario mencionado es también el autor del mensaje y si ambos están en un servidor
        if (mentionedUser && mentionedUser.id === message.author.id && message.guild) {
            const supportTeamRole = message.guild.roles.cache.find(role => role.name === 'Support Team');

            // Verificar si el usuario que envió el mensaje NO tiene el rol "Support Team"
            if (supportTeamRole && !message.member.roles.cache.has(supportTeamRole.id)) {
                // Ambos, el autor y el mencionado, están en el servidor y el autor NO tiene el rol "Support Team"
                console.log(`El usuario ${message.author.tag} (enviado) no tiene el rol Support Team`);
            
const userId = message.author.id;

            // Leer el archivo existente o crear uno nuevo si no existe
            let data = {};
            try {
                data = JSON.parse(fs.readFileSync('userdata.json', 'utf-8'));
            } catch (error) {
                console.error('Error al leer o parsear el archivo userdata.json:', error);
            }

            // Asignar un número al usuario o incrementar el número existente
            data[userId] = (data[userId] || 0) + 1;

            // Guardar los datos actualizados en el archivo
            try {
                fs.writeFileSync('userdata.json', JSON.stringify(data, null, 2), 'utf-8');
            } catch (error) {
                console.error('Error al escribir en el archivo userdata.json:', error);
            }
            const banembed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('Diresnode | Banned')
            .setDescription(`You've been warned 5 times, sorry but you get banned, you can use our services, but you can't get support in discord`);
            const embeded = new EmbedBuilder()
                .setColor('#FFFF00') // Amarillo
                .setTitle('Diresnode | Warning')
                .setDescription(`Hello user, one of our rules is don't ping anyone, if you get 5 warnings you're going to get banned \n Warings: ${data[userId]}`);
            if (data[userId] === 5) {
                            message.author.send({ embeds: [banembed] });
                userId.ban({ reason: 'Too many pings to staff' })
            } else {
                            message.author.send({ embeds: [embeded] });

            }
        }
    }
}
    if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === '') {
    const helpuser = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Comandos de ayuda')
      .setDescription('Aquí tienes algunos comandos de ayuda: \n**/banana** : Mide cuanto te mide tu banana en cm\n**/gay** : Comprueba que porcentaje eres gay\n**/games-multiplayer** : Juega con cualquier persona a cualquier juego\n**/games-singleplayer** : Juega tu solo a varios juegos clasicos')
      .setTimestamp();
    
    const helpadmin = new EmbedBuilder()
      .setColor('Red')
      .setTitle('Comandos de Moderación')
      .setDescription('Aquí tienes algunos comandos de moderacion: \n**/ban** : Banea a un usuario\n**/unban** : Desbanea a un usuario baneado\n**/mute** : Cayale durante un tiempo\n**/unmute** : Desbloquea que hable')
      .setTimestamp();
if (message.member.roles.cache.some(role => role.name === '👑 Owner 👑')) {
      message.author.send({ embeds: [helpadmin] });
  } else {
      message.author.send({ embeds: [helpuser] });
  }}
});
client.login(client.config.token).then(()=>{
    loadEvents(client);
    loadCommands(client);
})