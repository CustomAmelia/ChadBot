const Discord = require('discord.js')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
        let serverembed = new Discord.MessageEmbed()
        .setTitle("Server Information")
        .setColor("0ED4DA")
        .setThumbnail(message.guild.iconURL)
        .addField('Name', `${message.guild.name} (${message.guild.nameAcronym})`, true)
        .addField('Server Owner', message.guild.owner.user.tag, true)
        .addField("Server Create Date", message.guild.createdAt, true)
        .addField("Member Count", message.guild.memberCount, true)

        message.channel.send(serverembed)
    }
    usedCommand.add(message.author.id);
setTimeout(() => {
    usedCommand.delete(message.author.id);
}, 2000);
}

module.exports.config = {
    name: "serverstats",
    description: "Checks the server stats!",
    usage: "++serverstats",
    aliases: []
};