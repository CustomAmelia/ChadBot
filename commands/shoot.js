const Discord = require('discord.js')
const kills = require('../models/kills')

module.exports.run = async (bot, message, args) => {

    const data = await kills.findOne({
        UserID: message.author.id 
    });

    if (!data) {
        let newData = new kills({
            Kills: "1"
        })

        message.channel.send('you now have 1 kill')

        newData.save()
    }
    else if (data) {
        await kills.findOneAndRemove({
            UserID: message.author.id
        })

        message.channel.send(`you now have ${kills.Kills + 1} kills`)

        let newData = new kills({
            Kills: kills.Kills + 1,
            UserID: message.author.id
        })
        newData.save();
    }
}

module.exports.config = {
    name: "kill",
    description: "test",
    usage: "++kill",
    aliases: []
};