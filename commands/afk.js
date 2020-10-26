const Discord = require('discord.js')
const bugreportModel = require('../models/bugreport')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {

    let reason = ""

    if (!args[0]) {
        reason = "No reason specified."
    }
    else if (args[0]) {
        reason = args[0]
    }

    message.channel.send(reason)
    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 2000);
}
}

module.exports.config = {
    name: "afk",
    description: "testing afk",
    usage: "++afk <reason>",
    aliases: []
};