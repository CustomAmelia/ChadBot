const Discord = require('discord.js')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
        const snipes = bot.snipes.get(message.channel.id) || [];
        const msg = snipes[args[0] - 1 || 0];
        if (!msg) return message.channel.send(`That is not a valid snipe...`);
        const Embed = new Discord.MessageEmbed()
          .setAuthor(
            msg.author.tag,
            msg.author.displayAvatarURL({ dynamic: true, size: 256 })
          )
          .setDescription(msg.content)
          .setFooter(`Date: ${msg.date} | ${args[0] || 1}/${snipes.length}`);
        if (msg.attachment) Embed.setImage(msg.attachment);
        message.channel.send(Embed);
    }
    usedCommand.add(message.author.id);
setTimeout(() => {
    usedCommand.delete(message.author.id);
}, 2000);
}

module.exports.config = {
    name: "snipe",
    description: "Gets a deleted message!",
    usage: "++snipe <number>",
    aliases: []
};