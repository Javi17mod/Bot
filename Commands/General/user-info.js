

const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName("user-info")
    .setDescription(`Get info of a member in the server.`)
    .addUserOption(option => option.setName(`user`).setDescription(`the user you want to get info from`).setRequired(true)),
    async execute (interaction, client) {

        const formatter = new Intl.ListFormat(`en-GB`, { style: `narrow`, type: `conjunction` });
        
        //Change the emojis down below
        const badges = {
            BugHunterLevel1: "🪛 ",
            BugHunterLevel2: "🪛2 ",
            HypeSquadOnlineHouse1: "[Squad <:slash_command:1115752434564874240>] ",
            HypeSquadOnlineHouse2: "[Squad <:slash_command:1115752432052490300>] ",
            HypeSquadOnlineHouse3: "[Squad <:slash_command:1115752406744047666>] ",
            Hypesquad: "🏠 ",
            Partner: "🤝 ",
            PremiumEarlySupporter: "💳 ",
            Staff: "🛡️ ",
            VerfiedDeveloper: "⚙️✅ ",
            ActiveDeveloper: "⚙️ ",
        }

        const user = interaction.options.getUser(`user`) || interaction.user;
        const userFlags = user.flags.toArray();
        const member = await interaction.guild.members.fetch(user.id);
        const topRoles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role)
        .slice(0, 1)
        const banner = await (await client.users.fetch(user.id, { force: true })).bannerURL({ size: 4096 });
        const booster = member.premiumSince ? `<:slash_command:1003190237469614090> Yes` : `No`; //Change the emoji
        const ownerE = `👑,`// change the server owner emoji
        const devs = `<:slash_command:1105851316951064697>` // change the bot dev emoji
        const owners = [
            `937341470933942293`, // id for the devs of the bot
        ]
        const MutualServers = []
        const JoinPosition = await interaction.guild.members.fetch().then(Members => Members.sort((a, b) => a.joinedAt - b.joinedAt).map((User) => User.id).indexOf(member.id) + 1)

        for (const Guild of client.guilds.cache.values()) {
            if (Guild.members.cache.has(member.id)) {
                MutualServers.push(`[${Guild.name}](https://discord.com/guilds/${Guild.id})`)
            }
        }

        const bot = new EmbedBuilder() // you can remove this if you want
        .setColor(`Red`)
        .setTitle(`Warning`)
        .setDescription(`**Bots are not available** \n 🤖 \n Choose a real user`)
        if (member.user.bot) return await interaction.channel.sendTyping(), await interaction.reply({ embeds: [bot]});

        const embed = new EmbedBuilder()
        .setAuthor({ name: `ℹ️ 𝕀𝕟𝕗𝕠𝕣𝕞𝕒𝕥𝕚𝕠𝕟 ℹ️`, iconURL: member.displayAvatarURL()})
        .setTitle(`**${member.user.tag}** \n ${userFlags.length ? formatter.format(userFlags.map(flag => `${badges[flag]}`)) : ` `}`)
        .setColor(`01fcf1`)
        .setThumbnail(member.displayAvatarURL())
        .setDescription(`**Id** - ${member.id}\n• **Boosted** - ${booster}\n• **Joined** - <t:${parseInt(member.joinedAt / 1000)}:R>\n• **Discord User** - <t:${parseInt(user.createdAt / 1000)}:R>`)
        .addFields({ name: `Banner`, value: banner ? " " : "None"})
        .setImage(banner)
        .setFooter({ text: `${member ? `Join Position - ${JoinPosition} | ` : ''}Mutual Servers - ${MutualServers.length}`})
        
        // if the member id is equal to server owner
        if (member.id == interaction.guild.ownerId) {
            embed
            .setTitle(`**${member.user.tag}** ${ownerE} ${userFlags.length ? formatter.format(userFlags.map(flag => `${badges[flag]}`)) : ` `}`)
        }
        // if the member id is equal to the bot owners
        if (owners.includes(member.id)) {
            embed
            .setTitle(`**${member.user.tag}** ${devs} ${userFlags.length ? formatter.format(userFlags.map(flag => `${badges[flag]}`)) : ` `}`)
        }
        // if the member id is equal to server owner and bot owners
        if (owners.includes(member.id) && member.id == interaction.guild.ownerId) {
            embed
            .setTitle(`**${member.user.tag}** ${devs} ${ownerE} ${userFlags.length ? formatter.format(userFlags.map(flag => `${badges[flag]}`)) : ` `}`)
        }

        await interaction.channel.sendTyping(), await interaction.reply({ embeds: [embed] });
    }
}