const Discord = require('discord.js')
const settings = require('../../../botsettings.json');
const moment = require('moment')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    if (usedCommand.has(message.author.id)) {
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
        const flags = {
            DISCORD_EMPLOYEE: 'Discord Employee',
            DISCORD_PARTNER: 'Discord Partner',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
            HYPESQUAD_EVENTS: 'HypeSquad Events',
            HOUSE_BRAVERY: 'House of Bravery',
            HOUSE_BRILLIANCE: 'House of Brilliance',
            HOUSE_BALANCE: 'House of Balance',
            EARLY_SUPPORTER: 'Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot',
            VERIFIED_DEVELOPER: 'Verified Bot Developer'
        };

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
        const userFlags = member.user.flags.toArray();

        let b = ''

        if (member.user.bot === true) {
            b = "True"
        }
        else if (member.user.bot === false) {
            b = "False"
        }
        if (member.user.presence.status === 'dnd') member.user.presence.status = 'Do Not Disturb';
        if (member.user.presence.status === 'online') member.user.presence.status = 'Online';
        if (member.user.presence.status === 'idle') member.user.presence.status = 'Idle';
        if (member.user.presence.status === 'offline') member.user.presence.status = 'Offline';

		const embed = new Discord.MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || 'BLUE')
			.addField('User', [
				`**❯ Username:** ${member.user.username}`,
				`**❯ Discriminator:** ${member.user.discriminator}`,
				`**❯ ID:** ${member.id}`,
				`**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				`**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
				`**❯ Account Created:** ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`,
				`**❯ Status:** ${member.user.presence.status}`,
                `**❯ Bot:** ${b}.`,
				`\u200b`
			])
			.addField('Member', [
				`**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
				`**❯ Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
				`**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
				`\u200b`
            ]);
            if(settings.staff.includes(member.id)) {
                embed.setFooter('This user is apart of the ChadBot Staff Team!')
                message.channel.send(embed);
            }
            else return message.channel.send(embed);
    }
    usedCommand.add(message.author.id)
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 2000);
}

module.exports.config = {
    name: "whois",
    description: "Gives information about the user!",
    usage: "++whois @person / ++snipe",
    aliases: []
};