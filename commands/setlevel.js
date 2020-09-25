const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
    const person = message.mentions.users.first();

    if (!person) return;

    if (person.bot) return;

    Levels.setLevel(message.author.id, message.guild.id, 1000);
};

module.exports.config = {
    name: "setlevel",
    description: "test",
    usage: "++setlevel",
    aliases: []
}