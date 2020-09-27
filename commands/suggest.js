const Discord = require('discord.js')
const suggestionModel = require('../models/suggest')

module.exports.run = async (bot, message, args) => {
    message.channel.send('done')

    let newData = new suggestionModel({
        Suggestion: "test"
    })
    
    newData.save();
}

module.exports.config = {
    name: "suggest",
    description: "placeholder",
    usage: "++suggest",
    aliases: []
};