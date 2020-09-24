const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    const person = message.mentions.members.first()
    const user1 = await Levels.fetch(person.id, message.guild.id);
    
    if (!person || !user1) {
        const embed = new Discord.MessageEmbed()
        .setTitle(`**${message.author.username}'s Level**`)
        .addField('Level', user.level)
        .addField('XP', user.xp)
        .setTimestamp()
        .setColor("#57b9ff")
        message.channel.send(embed)
    }

    if (person) {
        const embed1 = new Discord.MessageEmbed()
        .setTitle(`**${person.username}'s Level**`)
        .addField('Level', personuser.level)
        .addField('XP', personuser.xp)
        .setTimestamp()
        .setColor("#57b9ff")
        message.channel.send(embed1)
    }
}

module.exports.config = {
    name: "rank",
    description: "Tells you your chad rank!",
    usage: "++rank",
    aliases: ["level"]
}