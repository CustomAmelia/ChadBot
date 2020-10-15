const Discord = require('discord.js')
const Levels = require('discord-xp')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    const person = message.mentions.users.first();
    const embed = new Discord.MessageEmbed()

    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 5 seconds to use this command again.')
    } else {

    if (!person) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        embed.setTitle(`${message.author.username}'s Level!`)
        embed.addField('Level', user.level)
        embed.addField('XP', user.xp)
        embed.setColor('RANDOM')
        message.channel.send(embed)
    }
    if (person) {
        if (person.bot) return;
        const user = await Levels.fetch(person.id, message.guild.id);
        embed.setTitle(`${person.username}'s Level!`)
        if (!user.level) {
            embed.addField('Level', '0')
        } else if (user.level) {
            embed.addField('Level', user.level)
        }
        if (!user.xp) {
            embed.addField('XP', '0')
        } else if (user.xp) {
            embed.addField('XP', user.xp)
        }
        embed.setColor("RANDOM")
        message.channel.send(embed)
    }
}
}

module.exports.config = {
    name: "rank",
    description: "Tells you your rank!",
    usage: "++rank",
    aliases: []
};