const Discord = require('discord.js')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle("Pinging...")
    .setColor("#8b73f4")

    const msg = await message.channel.send({ embed: embed });
    
    const embed2 = new Discord.MessageEmbed()
    .setTitle("Pong!")
    .setDescription(`API Latency: ${msg.createdTimestamp - message.createdTimestamp} ms\nBot Latency: ${bot.ws.ping} ms`)
    .setColor("#8b73f4")

    msg.edit({ embed: embed2 });
}

module.exports.config = {
    name: "ping",
    description: "Tells you the bot latency!",
    usage: "++ping",
    aliases: []
};