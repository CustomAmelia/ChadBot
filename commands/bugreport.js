const Discord = require('discord.js')
const bugreportModel = require('../models/suggest')

module.exports.run = async (bot, message, args) => {
    const bug = args.join(" ")

    if (!bug) return message.channel.send('Please specify a bug to report.')

    let newData = new suggestionModel({
        Bug: bug,
        GuildID: message.guild.id,
        GuildName: message.guild.name,
        UserID: message.author.id,
        UserUsername: message.author.username
    })

    message.channel.send('Bug report sent successfully!')

    newData.save();
}

module.exports.config = {
    name: "bugreport",
    description: "Lets you report bugs for Chad Bot!",
    usage: "++bugreport <bug>",
    aliases: []
};