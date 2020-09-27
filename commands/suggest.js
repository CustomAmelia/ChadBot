const Discord = require('discord.js')
const suggestionModel = require('../models/suggest')

module.exports.run = async (bot, message, args) => {
    const suggestion = args.join(" ")

    if (!suggestion) return message.channel.send('Please specify a suggestion.')

    message.channel.send('Suggestion sent successfully!')

    let newData = new suggestionModel({
        Suggestion: suggestion,
        GuildID: message.guild.id,
        UserID: message.author.id
    })

    if (newData.Suggestion === 'test') return;

    newData.save();
}

module.exports.config = {
    name: "suggest",
    description: "placeholder",
    usage: "++suggest",
    aliases: []
};