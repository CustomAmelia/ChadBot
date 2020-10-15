const Discord = require('discord.js')
const suggestionModel = require('../models/suggest')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    const suggestion = args.join(" ")

    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 5 seconds to use this command again.')
    } else {

    if (!suggestion) return message.channel.send('Please specify a suggestion.')

    let newData = new suggestionModel({
        Suggestion: suggestion,
        GuildID: message.guild.id,
        GuildName: message.guild.name,
        UserID: message.author.id,
        UserUsername: message.author.username
    })

    message.channel.send('Suggestion sent successfully!')

    newData.save();
}
}

module.exports.config = {
    name: "suggest",
    description: "Lets you suggest features to Chad Bot",
    usage: "++suggest <suggestion>",
    aliases: []
};