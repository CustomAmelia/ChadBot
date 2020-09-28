const Discord = require('discord.js')
const wl = require('../models/wl')

module.exports.run = async (bot, message, args) => {

    const data = await wl.findOne({
        GuildID: message.guild.id
    });

    if (data) {
        await wl.findOneAndRemove({
            GuildID: message.guild.id
        })
        
        message.channel.send('You are already whitelisted!')
    }
    else if (!data) {

        let newData = new wl({
            GuildID: message.guild.id
        })

        message.channel.send('Whitelisted!')
    
        newData.save();
    }
}

module.exports.config = {
    name: "whitelist",
    description: "test",
    usage: "++whitelist",
    aliases: ["wl"]
};