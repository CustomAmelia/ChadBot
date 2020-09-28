const Discord = require('discord.js')
const wl = require('../models/wl')

module.exports.run = async (bot, message, args) => {

    let newData = new wl({
        GuildID: message.guild.id
    })

    message.channel.send('Whitelisted!')

    newData.save();
}

module.exports.config = {
    name: "whitelist",
    description: "test",
    usage: "++whitelist",
    aliases: ["wl"]
};