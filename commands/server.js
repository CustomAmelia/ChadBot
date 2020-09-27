const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    message.channel.send("Join our disocrd server here! https://discord.gg/AEGRMSS")
}

module.exports.config = {
    name: "invite",
    description: "Gives you the link to invite this bot!",
    usage: "++invite",
    aliases: []
};