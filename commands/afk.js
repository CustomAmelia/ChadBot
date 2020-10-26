const Discord = require('discord.js')
const afkModel = require('../models/afk')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {

    const data = await afkModel.findOne({
        UserID: message.author.id
    });

    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {

    let reason = ""

    if (!args.join(" ")) {
        reason = "No reason specified."
    }

    if (args.join(" ").includes === '@') {
        reason = "No reason. (reason contained @)"
    }
    else if (args[0]) {
        reason = args.join(" ")
    }
    let newData = new afkModel({
        UserID: message.author.id,
        GuildID: message.guild.id,
        Reason: reason
    })

    message.channel.send(`${message.author} is now AFK, Reason: ${reason}`)

    newData.save()

    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 2000);
}
}

module.exports.config = {
    name: "afk",
    description: "Sets you to afk mode!",
    usage: "++afk <reason>",
    aliases: []
};