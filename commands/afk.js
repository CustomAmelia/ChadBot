const Discord = require('discord.js')
const afkModel = require('../models/afk')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {

    const data = await afkModel.findOne({
        UserID: message.author.id
    });

    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {

    let reason = ""

    if (!args[0]) {
        reason = "No reason specified."
    }
    else if (args[0]) {
        reason = args[0]
    }


    let newData = new afkModel({
        UserID: message.author.id,
        GuildID: message.guild.id,
        Reason: reason
    })

    const embed = new Discord.MessageEmbed()
    .setTitle('AFK')
    .setDescription(`${message.author} is now AFK, Reason: ${reason}`)
    .setColor("RANDOM")

    message.channel.send(embed)

    newData.save()

    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 2000);
}
}

module.exports.config = {
    name: "afk",
    description: "Sets you to afk mode!",
    usage: "++afk <reason>",
    aliases: []
};