const Discord = require('discord.js')
const kills = require('../models/kills')

module.exports.run = async (bot, message, args) => {

    const data = await kills.findOne({
        UserID: message.author.id 
    });

    if (!data) {
        let newData = new kills({
            Kills: data.Kills,
            UserID: message.author.id
        })

        message.channel.send('you now have 1 kill')

        newData.save()
    }
    else if (data) {
        await kills.findOneAndRemove({
            UserID: message.author.id
        })

        message.channel.send(`you now have ${data.Kills} kills`)

        let newData = new kills({
            Kills: data.Kills,
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