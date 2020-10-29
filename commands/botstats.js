const Discord = require('discord.js')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
    let days = Math.floor(bot.uptime / 86400000);
    let hours = Math.floor(bot.uptime / 3600000) % 24;
    let minutes = Math.floor(bot.uptime / 60000) % 60;
    let seconds = Math.floor(bot.uptime / 1000) % 60;
    const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
    arr.reverse();
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
        const embed = new Discord.MessageEmbed()
        .setTitle('Bot Stats')
        .setColor("RANDOM")
        .addField('Memory Usage', `${Math.round(used * 100) / 100}MB`, true)
        .addField('Uptime', `${days}d ${hours}h ${minutes}m ${seconds}s`, true)
        .addField('Guilds', bot.guilds.cache.size, true)
        .addField('Developer', "<@498097065264676864>", true)
        message.channel.send(embed)
    }
    usedCommand.add(message.author.id);
setTimeout(() => {
    usedCommand.delete(message.author.id);
}, 2000);
}

module.exports.config = {
    name: "botstats",
    description: "Checks the bot stats.",
    usage: "++botstats",
    aliases: []
};