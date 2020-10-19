const Discord = require("discord.js")
const got = require('got')
const botconfig = require("../botsettings.json");
const usedCommand = new Set()

module.exports.run = (bot, message, args) => {
    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
        const image = Discord.MessageAttachment('https://thispersondoesnotexist.com/image')

        message.channel.send(image)
}
usedCommand.add(message.author.id);
setTimeout(() => {
    usedCommand.delete(message.author.id);
}, 2000);
}

module.exports.config = {
    name: "fakeperson",
    description: "Posts a random fake face!",
    usage: "++fakeperson",
    aliases: []
}