const { MessageEmbed, version: djsversion } = require('discord.js')
const { version } = require('../../package.json')
const { utc } = require('moment')
const os = require('os')
const ms = require('ms')
const settings = require('../../botsettings.json');
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    if (usedCommand.has(message.author.id)) {
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
		const core = os.cpus()[0];
		let totalSeconds = (bot.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);
		let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
		const embed = new MessageEmbed()
			.setThumbnail(bot.user.displayAvatarURL())
			.setColor(message.guild.me.displayHexColor || 'BLUE')
			.addField('General', [
				`**❯ Client:** ${bot.user.tag} (${bot.user.id})`,
				`**❯ Commands:** ${bot.commands.size}`,
				`**❯ Servers:** ${bot.guilds.cache.size.toLocaleString()} `,
				`**❯ Users:** ${bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
				`**❯ Channels:** ${bot.channels.cache.size.toLocaleString()}`,
				`**❯ Creation Date:** ${utc(bot.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
				`**❯ Node.js:** ${process.version}`,
				`**❯ Version:** v${settings.version}`,
				`**❯ Discord.js:** v${djsversion}`,
				'\u200b'
			])
			.addField('System', [
				`**❯ Platform:** ${process.platform}`,
				`**❯ Uptime:** ${uptime}`,
				`**❯ CPU:**`,
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`,
			])
			.setTimestamp();

		message.channel.send(embed);
    }
    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 2000);
}

module.exports.config = {
    name: "botinfo",
    description: "Tells you bot information.",
    usage: "++botinfo",
    aliases: []
};