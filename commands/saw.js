const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    const person = message.mentions.users.first();

    if (!person) return message.channel.send("Who do I saw in half?")

    message.channel.send(`*saws ${person.username} in half*`)
}

module.exports.config = {
    name: "saw",
    description: "I sawed this person in half!",
    usage: "++saw <person>",
    aliases: []
}