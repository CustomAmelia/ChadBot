const Discord = require('discord.js')
const bugreportModel = require('../models/bugreport')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 5 seconds to use this command again.')
    } else {

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
    
    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 5000);
}
}

module.exports.config = {
    name: "bugreport",
    description: "Lets you report bugs for Chad Bot!",
    usage: "++bugreport <bug>",
    aliases: []
};