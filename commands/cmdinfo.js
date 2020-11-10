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
          
          command = bot.commands.get(command);
          var embed = new Discord.MessageEmbed()
          .setAuthor(`${command.config.name} Command`)
          .setDescription(`
          - **Command's Description** __${command.config.description || "There is No Description for this command."}__
          - **Command's Usage:** __${command.config.usage || "No Usage"}__
          - **Command's Aliases:** __${command.config.aliases || "No Aliases"}__
          `)
          .setColor('#2EFF00')

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