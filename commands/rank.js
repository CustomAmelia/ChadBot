const Discord = require('discord.js')
const Levels = require('discord-xp')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    const person = message.mentions.members.first()
    const embed = new Discord.MessageEmbed()

    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
    if (!person) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        embed.setTitle(`${message.author.username}'s Rank!`)
        embed.setColor('RANDOM')
        embed.setDescription(`• **Level:** ${user.level} \n • **XP:** ${user.xp}`)
        message.channel.send(embed)
    }
    else if (person) {
        if (person.bot) return;
        const user = await Levels.fetch(person.id, message.guild.id);
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