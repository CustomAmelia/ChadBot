const Discord = require("discord.js")
const config = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {
    message.channel.send("Hello")
}

module.exports.config = {
    name: "ping",
    description: "",
    usage: "++ping",
    accessableby: "Members",
    aliases: ['']
}