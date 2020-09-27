const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const prefixModel = require("../models/prefix")


module.exports.run = async (bot, message, args) => {
    const data = await prefixModel.findOne({
        GuildID: message.guild.id
    });

    if (!args[0]) return message.channel.send('You must provide a **new prefix**!');

    if (args[0].length > 10) return message.channel.send('Your new prefix must be under \`10\` characters!')

    if (message.member.hasPermission('MANAGE_GUILD')) {
    if (data) {
        await prefixModel.findOneAndRemove({
            GuildID: message.guild.id
        })
        
        message.channel.send(`The new prefix is now **\`${args[0]}\`**`)

        let newData = new prefixModel({
            Prefix: args[0],
            GuildID: message.guild.id
        })
        newData.save();
    } else if (!data) {
        message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

        let newData = new prefixModel({
            Prefix: args[0],
            GuildID: message.guild.id
        })
        newData.save();
    }
}
else if (!message.member.hasPermission('MANAGE_GUILD')) {
    message.channel.send('uh oh! you do not have the required permissions to run this command, you need the MANAGE_GUILD permission!')
}
}

module.exports.config = {
    name: "setprefix",
    description: "Sets the server prefix!",
    usage: "++setprefix <new prefix>",
    aliases: []
}