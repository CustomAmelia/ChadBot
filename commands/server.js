const Discord = require('discord.js')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    message.channel.send("Join our discord server here! https://discord.gg/AEGRMSS (THIS SECTION IS TO MAKE SURE SOMETHING WORKS)")
}

module.exports.config = {
    name: "server",
    description: "Gives you the link to join our official discord server!",
    usage: "++server",
    aliases: []
};