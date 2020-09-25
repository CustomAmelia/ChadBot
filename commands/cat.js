const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const { get } = require("snekfetch"); 

module.exports.run = async (bot, message, args) => {
    try {
        get('https://aws.random.cat/meow').then(res => {
            return message.channel.send({files: [{attachment: res.body.file, name: `cat.${res.body.file.split('.')[2]}`}]});
        });
    } catch(err) {
        return message.channel.send(err.stack);
    }
}

module.exports.config = {
    name: "cat",
    description: "**cat**",
    usage: "++cat",
    aliases: []
}