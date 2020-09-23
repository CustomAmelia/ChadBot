const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    
    message.channel.send(`You are currently chad level **${user.level}**!`)
}

module.exports.config = {
    name: "rank",
    description: "Tells you your chad rank!",
    usage: "++rank",
    aliases: ["level"]
}