const Discord = require('discord.js')
const Levels = require('discord-xp');
const { prependOnceListener } = require('discord-xp/models/levels');

module.exports.run = async (bot, message, args) => {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    const person = message.mentions.users.first();
    
    if (!person) {
    const embed = new Discord.MessageEmbed()
    .setTitle(`**${message.author.username}'s Level**`)
    .addField('Level', user.level)
    .addField('XP', user.xp)
    .setTimestamp()
    .setColor("#57b9ff")
    message.channel.send(embed)
    }

    const embed = new Discord.MessageEmbed()
    .setTitle(`**${person.username}'s Level**`)
    .addField('Level', user.level)
    .addField('XP', user.xp)
    .setTimestamp()
    .setColor("#57b9ff")
    message.channel.send(embed)
}

module.exports.config = {
    name: "rank",
    description: "Tells you your chad rank!",
    usage: "++rank",
    aliases: ["level"]
}