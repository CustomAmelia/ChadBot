const Discord = require('discord.js')
const bugreportModel = require('../models/bugreport')
const usedCommandRecently = new Set()

module.exports.run = async (bot, message, args) => {
    if (usedCommandRecently) {
        message.channel.send('cooldown! wait 30 seconds')
    }

    else if (!usedCommandRecently) {

    const bug = args.join(" ")

    if (!bug) return message.channel.send('Please specify a bug to report.')

    let newData = new bugreportModel({
        Bug: bug,
        GuildID: message.guild.id,
        GuildName: message.guild.name,
        UserID: message.author.id,
        UserUsername: message.author.username
    })

    message.channel.send('Bug report sent successfully!')

    newData.save();

    usedCommandRecently.add(message.author.id)
    setTimeout(() => {
        usedCommandRecently.delete(message.author.id)
    }, 30000)
}
}

module.exports.config = {
    name: "bugreport",
    description: "Lets you report bugs for Chad Bot!",
    usage: "++bugreport <bug>",
    aliases: []
};