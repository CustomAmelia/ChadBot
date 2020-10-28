const Discord = require('discord.js')
const usedCommand = new Set()

module.exports.run = async (bot, message, args, delay) => {
    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
        if (!message.author.id === '498097065264676864')
        return message.channel.send(
          `You do not have the correct permissions to run this command, ${message.author.username}`
        );

        const channels = ['717155975295139850', '573978262754164761']

        const { channel, content } = message

        if (!channels.includes(channel.id)) {
          return
        }
    
        const eachLine = content.split('\n')
    
        for (const line of eachLine) {
          if (line.includes('=')) {
            const split = line.split('=')
            const emoji = split[0].trim()
            message.react(emoji)
          }
        }
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