const Discord = require('discord.js')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    const person = getUserFromMention(args[0]);

    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {

    if (!person) return message.channel.send("Who do I saw in half?")

    message.channel.send(`*saws ${person.username} in half*`)
    }
    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 2000);
}

module.exports.config = {
    name: "saw",
    description: "I sawed this person in half!",
    usage: "++saw <person>",
    aliases: []
};