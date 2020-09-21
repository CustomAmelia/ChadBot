const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {
    return message.channel.send("Hello")
}

module.exports.botconfig = {
    name: "ping",
    description: "",
    usage: "++ping",
    accessableby: "Members",
    aliases: ['']
}