const Discord = require('discord.js')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
        if (!message.author.id === '498097065264676864')
        return message.channel.send(
          `You do not have the correct permissions to run this command, ${message.author.username}`
        );
      const channel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]);
      if (!channel) {
        return message.channel.send(
          `You did not mention / give the id of your channel!`
        );
      }
      let question = args.join(' ')
        .split(`${bot.prefix}poll ${channel} `)
        .join("");
      if (!question)
        return message.channel.send(`You did not specify your question!`);
      const Embed = new Discord.MessageEmbed()
        .setTitle(`New poll!`)
        .setDescription(`${question}`)
        .setFooter(`${message.author.username} created this poll.`)
        .setColor(`RANDOM`);
      let msg = await bot.channels.cache.get(channel.id).send(Embed);
      await msg.react("👍");
      await msg.react("👎");
    }
    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 2000);
}

module.exports.config = {
    name: "poll",
    description: "I sawed this person in half!",
    usage: "++poll #channel pollmessage",
    aliases: []
};