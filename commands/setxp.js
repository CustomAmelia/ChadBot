const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
    const target = message.mentions.users.first()

    if (!target) return;
    if (!args[0]) return;

    Levels.setLevel(target.id, message.guild.id, args[0]);
}

module.exports.config = {
    name: "setlevel",
    description: "Gives the player a set amount of levels!",
    usage: "++setlevel <player>",
    aliases: []
}