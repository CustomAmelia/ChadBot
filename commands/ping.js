const Discord = require('discord.js')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    message.channel.send("Pinging...").then(m =>{
        var ping = m.createdTimestamp - message.createdTimestamp;
        var botPing = Math.round(bot.pi);

        m.edit(`*Pong!* Bot Ping Is: ${ping}ms`);
    });
}

module.exports.config = {
    name: "ping",
    description: "Tells you the bot latency!",
    usage: "++ping",
    aliases: []
};