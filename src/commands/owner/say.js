const Discord = require('discord.js')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    const msg = args.join(' ')

    if (!msg) return;
    if (message.author.id === '498097065264676864') {
        message.channel.send(msg)
    }
}

module.exports.config = {
    name: "say",
    description: "Sends the message you tell it to!",
    usage: "++say <msg>",
    aliases: []
};