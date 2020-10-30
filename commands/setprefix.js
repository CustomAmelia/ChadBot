const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const prefixModel = require("../models/prefix")
const usedCommand = new Set()


module.exports.run = async (bot, message, args) => {
    const thing = args.join(" ")

    const data = await prefixModel.findOne({
        GuildID: message.guild.id
    });

    if (usedCommand.has(message.author.id)) {
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
        if (!thing) return message.channel.send('You must provide a **new prefix**!');

        if (thing.length > 10) return message.channel.send('Your new prefix must be under \`10\` characters!')

        if (message.member.hasPermission('MANAGE_GUILD')) {
            if (data) {
                await prefixModel.findOneAndRemove({
                    GuildID: message.guild.id
                })

                message.channel.send(`The new prefix is now **\`${thing}\`**`)

                let newData = new prefixModel({
                    Prefix: thing,
                    GuildID: message.guild.id
                })
                newData.save();
            } else if (!data) {
                message.channel.send(`The new prefix is now **\`${thing}\`**`);

                let newData = new prefixModel({
                    Prefix: thing,
                    GuildID: message.guild.id
                })
                newData.save();
            }
        } else if (!message.member.hasPermission('MANAGE_GUILD')) {
            message.channel.send('Uh Oh! You do not have the required permissions to run this command, you need the MANAGE_GUILD or ADMINISTRATOR permission!')
        }
    }
    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 2000);
}

module.exports.config = {
    name: "setprefix",
    description: "Sets the server prefix!",
    usage: "++setprefix <new prefix>",
    aliases: []
}