const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const prefix = require("../models/prefix")


module.exports.run = async (bot, message, args) => {
    const data = await prefix.findOne({
        GuildID: message.guild.id
    });

    if (!data) {
        message.channel.send(`The prefix for this server is currently ``++``.`)
    }
    if (data) {
        message.channel.send(`The prefix for this server is currently ``${data.Prefix}``.`)
    }
}

module.exports.config = {
    name: "prefix",
    description: "Shows you the current server prefix!",
    usage: "++prefix",
    aliases: []
}