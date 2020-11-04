const Discord = require('discord.js')
const Levels = require('discord-xp')
const canvacord = require('canvacord')
const data = require('canvacord/src/Plugins')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {

    if (usedCommand.has(message.author.id)) {
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
        const person = message.mentions.users.first()
        if (!person) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            const neededXp = Levels.xpFor(parseInt(user.level) + 1)
            if (message.author.user.presence.status === 'dnd') message.author.user.presence.status = 'Do Not Disturb';
            if (message.author.user.presence.status === 'online') message.author.user.presence.status = 'Online';
            if (message.author.user.presence.status === 'idle') message.author.user.presence.status = 'Idle';
            if (message.author.user.presence.status === 'offline') message.author.user.presence.status = 'Offline';
            const rank = new canvacord.Rank()
                .setAvatar(message.author.displayAvatarURL({
                    dynamic: false,
                    format: 'png'
                }))
                .setCurrentXP(user.xp)
                .setRequiredXP(neededXp)
                .setStatus(message.author.user.presence.status)
                .setProgressBar('#FFA500', "COLOR")
                .setUsername(message.author.username)
                .setDiscriminator(message.author.user.discriminator)
            rank.build()
                .then(data => {
                    const attachment = new Discord.MessageAttachment(data, 'rank.png')
                    message.channel.send(attachment)
                })
        } else if (person) {
            if (person.bot) return;
            const user = await Levels.fetch(person.id, message.guild.id);
            const neededXp = Levels.xpFor(parseInt(user.level) + 1)
            if (person.user.presence.status === 'dnd') person.user.presence.status = 'Do Not Disturb';
            if (person.user.presence.status === 'online') person.user.presence.status = 'Online';
            if (person.user.presence.status === 'idle') person.user.presence.status = 'Idle';
            if (person.user.presence.status === 'offline') person.user.presence.status = 'Offline';
            const rank = new canvacord.Rank()
                .setAvatar(person.user.displayAvatarURL({
                    dynamic: false,
                    format: 'png'
                }))
                .setCurrentXP(user.xp)
                .setRequiredXP(neededXp)
                .setStatus(person.user.presence.status)
                .setProgressBar('#FFA500', "COLOR")
                .setUsername(person.user.username)
                .setDiscriminator(person.user.discriminator)
            rank.build()
                .then(data => {
                    const attachment = new Discord.MessageAttachment(data, 'rank.png')
                    message.channel.send(attachment)
                })
            embed.setTitle(`${person.username}'s Rank!`)
            if (!user.xp) {
                embed.setDescription('• **Level:** 0 \n • **XP:** 0')
            } else if (user.xp) {
                embed.setDescription(`• **Level:** ${user.level} \n • **XP:** ${user.xp}`)
            }
            embed.setColor("RANDOM")
            message.channel.send(embed)
        }
    }
    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 2000);
}

module.exports.config = {
    name: "rank",
    description: "Tells you your rank!",
    usage: "++rank",
    aliases: []
};