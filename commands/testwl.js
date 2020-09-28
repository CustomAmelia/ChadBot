const Discord = require('discord.js')
const wl = require('../models/wl')

module.exports.run = async (bot, message, args) => {
    const data = await wl.findOne({
        GuildID: message.guild.id
    });

    if (data) {
        message.channel.send('you are whitelisted')
    }
    else if (!data) {
        message.channel.send('you are not whitelisted')
    }
}

module.exports.config = {
    name: "test",
    description: "test",
    usage: "++test",
    aliases: []
};