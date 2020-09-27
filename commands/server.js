const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    message.channel.send("Join our discord server here! https://discord.gg/AEGRMSS")
}

module.exports.config = {
    name: "server",
    description: "Gives you the link to join our official discord server!",
    usage: "++server",
    aliases: []
};