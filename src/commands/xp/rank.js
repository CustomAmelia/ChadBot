const Discord = require('discord.js')
const Levels = require('discord-xp')
const canvacord = require('canvacord')
const data = require('canvacord/src/Plugins')
const usedCommand = new Set()

module.exports.run = async (bot, message, args, delay) => {

    if (usedCommand.has(message.author.id)) {
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
        const person = message.mentions.users.first()
        if (!person) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            const neededXp = Levels.xpFor(parseInt(user.level) + 1)
            const rank = new canvacord.Rank()
                .setAvatar(person.displayAvatarURL({
                    dynamic: false,
                    format: 'png'
                }))
                .setCurrentXP(user.xp)
                .setBackground("IMAGE", 'https://i.imgur.com/5QHCaOQ.png')
                .setRequiredXP(neededXp)
                .setStatus(person.presence.status)
                .setProgressBar('#8b73f4', "COLOR")
                .setUsername(person.username)
                .setDiscriminator(person.discriminator)
                .setLevel(user.level)
                .setRank(0)
            rank.build()
                .then(data => {
                    const attachment = new Discord.MessageAttachment(data, 'rank.png')
                    message.channel.send(attachment)
                    gifsent.delete()
                })
        } else if (person) {
            if (person.bot) return;
            const user = await Levels.fetch(person.id, message.guild.id);
            const neededXp = Levels.xpFor(parseInt(user.level) + 1)
            const rank = new canvacord.Rank()
                .setAvatar(person.displayAvatarURL({
                    dynamic: false,
                    format: 'png'
                }))
                .setCurrentXP(user.xp)
                .setBackground("IMAGE", 'https://i.imgur.com/5QHCaOQ.png')
                .setRequiredXP(neededXp)
                .setStatus(person.presence.status)
                .setProgressBar('#8b73f4', "COLOR")
                .setUsername(person.username)
                .setDiscriminator(person.discriminator)
                .setLevel(user.level)
                .setRank(0)
            rank.build()
                .then(data => {
                    const attachment = new Discord.MessageAttachment(data, 'rank.png')
                    message.channel.send(attachment)
                    gifsent.delete()
                });
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