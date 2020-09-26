const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    message.channel.send("Invite the bot here! http://bit.ly/discordchadbot")
}

module.exports.config = {
    name: "invite",
    description: "Gives you the link to invite this bot!",
    usage: "++invite",
    aliases: []
};