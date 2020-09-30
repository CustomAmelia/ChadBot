const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = (bot, message, args) => {
    const person = message.mentions.users.first();
    const responses = [`**BANG BANG!** You shot ${person.username} to death!`, `**BANG BANG!** You tried to shoot ${person.username} but you missed and you got shot instead!`, `**BANG BANG!** You shot ${person.username} but he did not die!`]
    const response = responses[Math.floor(Math.random() * responses.length)];

    if (!person) return message.channel.send("Please specify a user to shoot!")

    message.channel.send(response)
}

module.exports.config = {
    name: "shoot",
    description: "Shoots the user you mention.",
    usage: "++shoot @user",
    aliases: []
}