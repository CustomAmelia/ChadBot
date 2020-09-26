const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const prefix = require('../models/prefix');

module.exports.run = async (bot, message, args) => {

  const data = await prefix.findOne({
    GuildID: message.guild.id
});

  if (args[0] === 'fun') {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('**😂 Fun Commands**')
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

  if (args[0] === 'utility') {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('**🛠️ Utility Commands**')
    embed.setDescription('``help``, ``invite``')
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
    embed.setTitle('**⚙️ Config Commands**')
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
    embed.setTitle('**Chad Bot Command List**')
    embed.setColor('RANDOM')
    embed.addFields({
      name: "😂 **Fun**",
      value: "``help fun``",
      inline: true
    },
    {
      name: "🛠️ **Utility**",
      value: "``help utility``",
      inline: true
    },
    {
      name: "⚙️ **Config**",
      value: "``help config``",
      inline: true
    },
    )

    if (!data) {
      embed.setFooter('use ++ before each help category command!')
    }
else if (data) {
  embed.setFooter(`use ${data.Prefix} before each help category command!`)
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