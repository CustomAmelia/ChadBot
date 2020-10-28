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

        const topic = args.join(' ')
        const embed = new Discord.MessageEmbed()
        .setTitle('New Poll')
        .setColor("RANDOM")
        .setDescription(topic)
        .setFooter(`Started by ${message.author.username} + #${message.author.discriminator}`)
        const mes = await message.channel.send(embed)
        await mes.react("👍")
        await mes.react("👎")
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