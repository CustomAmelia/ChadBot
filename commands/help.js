const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const prefix = require('../models/prefix');

module.exports.run = async (bot, message, args) => {

  const data = await prefix.findOne({
    GuildID: message.guild.id
});

  if (args[0] === 'fun') {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('**Chad Bot || Fun Commands**')
    embed.setDescription(' ``meme``, ``frickword``')
    embed.setColor('RANDOM')
    if (!data) {
      embed.setFooter('use ++ before each command')
    }
else if (data) {
  embed.setFooter(`use ${data.Prefix} before each command!`)
}
    
    message.channel.send(embed)
  }

  if (args[0] === 'info') {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('**Chad Bot || Information Commands**')
    embed.setDescription('``help``')
    embed.setColor('RANDOM')
    if (!data) {
      embed.setFooter('use ++ before each command')
    }
else if (data) {
  embed.setFooter(`use ${data.Prefix} before each command!`)
}
    
    message.channel.send(embed)
  }

  if (args[0] === 'config') {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('**Chad Bot || Config Commands**')
    embed.setDescription('``setprefix <new prefix>``')
    embed.setColor('RANDOM')
    if (!data) {
      embed.setFooter('use ++ before each command')
    }
else if (data) {
  embed.setFooter(`use ${data.Prefix} before each command!`)
}
    
    message.channel.send(embed)
  }

  if (!args.length) {

    const embed = new Discord.MessageEmbed()
    embed.setTitle('**Chad Bot || Help**')
    embed.setColor('RANDOM')
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

    if (!data) {
      embed.setFooter('use ++ before each command')
    }
else if (data) {
  embed.setFooter(`use ${data.Prefix} before each command!`)
}
    message.channel.send(embed)
  }
}

module.exports.config = {
    name: "help",
    description: "Here you can find a full list of the commands you can use along with some cool tips!",
    usage: "++help",
    aliases: ['cmds']
}