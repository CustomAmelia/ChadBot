const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if (message.author.id !== '498097065264676864') return;

    const { member, channel, content } = message

      const result = eval(args.join(' '))

      if (!result) return;
      channel.send(result).catch(error => {
          message.channel.send(`ERROR: ${error}`)
      })
}
module.exports.config = {
    name: "eval",
    description: "Evaluates code!",
    usage: "++eval",
    aliases: []
};