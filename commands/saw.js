const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    const person = message.mentions.users.first();

    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 5 seconds to use this command again.')
    } else {

    if (!person) return message.channel.send("Who do I saw in half?")

    message.channel.send(`*saws ${person.username} in half*`)
    }
}

module.exports.config = {
    name: "saw",
    description: "I sawed this person in half!",
    usage: "++saw <person>",
    aliases: []
};