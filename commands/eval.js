const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if (message.author.id !== '498097065264676864') return;

    const { member, channel, content } = message

      const result = args.join(' ')

      if (!result) return;
      channel.send(result)
}
module.exports.config = {
    name: "eval",
    description: "Evaluates code!",
    usage: "++eval",
    aliases: []
};