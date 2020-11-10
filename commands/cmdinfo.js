const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
  if (usedCommand.has(message.author.id)) {
    message.reply('Slow down! You have to wait 2 seconds to use this command again.')
  } else {
    let helpArray = message.content.split(" ");
    let helpArgs = helpArray.slice(1);

    if(helpArgs[0]) {
      let command = helpArgs[0];

      if(bot.commands.has(command)) {
          
          command = bot.commands.toLowerCase().get(command)
          var embed = new Discord.MessageEmbed()
          .setAuthor(`${command.config.name} Command`)
          .addField('Description:', `${command.config.description || "There is no description for this command."} `)
          .addField('Usage:', `${command.config.usage || "No Usage"}`)
          .addField('Aliases:', `${command.config.aliases || "No Aliases"}`)
          .setColor('RANDOM')

      message.channel.send(embed);
  }}
  }
    usedCommand.add(message.author.id);
    setTimeout(() => {
      usedCommand.delete(message.author.id);
    }, 2000);
}

module.exports.config = {
  name: "cmdinfo",
  description: "You can find the information of a command using this command!",
  usage: "++cmdinfo <cmd> ",
  aliases: ['info']
}