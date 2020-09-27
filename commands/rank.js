const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
    const person = message.mentions.users.first();

    if (!person) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You are currently level **${user.level}**!`)
    }
    if (person) {
        if (person.bot) return;
        const user = await Levels.fetch(person.id, message.guild.id);
        message.channel.send(`${person.username} is currently level **${user.level}**!`)
    }
}

module.exports.config = {
    name: "rank",
    description: "Tells you your rank!",
    usage: "++rank",
    aliases: []
};