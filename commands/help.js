const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = (bot, message, args) => {

  if (args[0] === 'fun') {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('**Chad Bot || Fun Commands**')
    embed.setDescription('``hack <@person>``, ``meme``')
    embed.setColor('#0099ff')
    embed.setFooter('use ++ before each command!')
    
    message.channel.send(embed)
  }

  if (args[0] === 'info') {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('**Chad Bot || Fun Commands**')
    embed.setDescription('``hack <@person>``, ``meme``')
    embed.setColor('#0099ff')
    embed.setFooter('use ++ before each command!')
    
    message.channel.send(embed)
  }

  if (!args.length) {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('List of Commands:')
    embed.setDescription('Subreddits bot list of commands.')
    embed.setColor('#FF5700')
    embed.addFields({
      name: "**Fun** 😂",
      value: "``++help fun``",
      inline: true
    },
    {
      name: "**Information** ❓",
      value: "``++help info``",
      inline: true
    },
    )

    message.channel.send(embed)
  }
}

module.exports.config = {
    name: "help",
    description: "Here you can find a full list of the commands you can use along with some cool tips!",
    usage: "++help",
    aliases: ['cmds']
}