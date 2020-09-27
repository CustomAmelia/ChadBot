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
    embed.setDescription('``meme``, ``frickword``')
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
    if (data) {
      embed.setDescription(`Want to invite this bot to your server? use ${data.Prefix}invite!`)
    }
    else if (!data) {
      embed.setDescription(`Want to invite this bot to your server? use ++invite!`)
    }
    embed.setColor('RANDOM')
    if (!data) {
      embed.addField("😂 **Fun**", "``++help fun``", true)
      embed.addField("🛠️ **Utility**", "``++help utility``", true)
      embed.addField("⚙️ **Config**", "``++help config``", true)
    }
    else if (data) {
      embed.addField("😂 **Fun**", "``" + data.Prefix + "help fun``", true)
      embed.addField("🛠️ **Utility**", "``" + data.Prefix + "help utility``", true)
      embed.addField("⚙️ **Config**", "``" + data.Prefix + "help config``", true)
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