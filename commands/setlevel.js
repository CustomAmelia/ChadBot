const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {

    if (message.author.id === '498097065264676864') {
    Levels.setLevel(message.author.id, message.guild.id, 1000);
    }
};

module.exports.config = {
    name: "setlevel",
    description: "test",
    usage: "++setlevel",
    aliases: []
}