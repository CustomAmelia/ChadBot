const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = (bot, message, args) => {
  if (args[0] === 'fun') {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('**Chad Bot || Fun Commands**')
    embed.setDescription('``hack <@person>``, ``meme``')
    embed.setColor('RANDOM')
    embed.setFooter('use the default prefix ++ or your custom server prefix before each command!')
    
    message.channel.send(embed)
  }

  if (args[0] === 'info') {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('**Chad Bot || Fun Commands**')
    embed.setDescription('``hack <@person>``, ``meme``')
    embed.setColor('RANDOM')
    embed.setFooter('use the default prefix ++ or your custom server prefix before each command!')
    
    message.channel.send(embed)
  }

  if (args[0] === 'config') {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('**Chad Bot || Fun Commands**')
    embed.setDescription('``setprefix <prefix>``')
    embed.setColor('RANDOM')
    embed.setFooter('use the default prefix ++ or your custom server prefix before each command!')
    
    message.channel.send(embed)
  }

  if (!args.length) {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('**Chad Bot || Help**')
    embed.setColor('#57b9ff')
    embed.setFooter('++help <category> or custom server prefix before the help <category> cmd!')
    embed.addFields({
      name: "**Fun** 😂",
      value: "``help fun``",
      inline: true
    },
    {
      name: "**Information** ❓",
      value: "``help info``",
      inline: true
    },
    {
      name: "**Config** ⚙️",
      value: "``help config``",
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