const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = (bot, message, args) => {

  if (args[0] === 'fun') {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('Chad Bot || Fun Commands')
    embed.setDescription('``hack <@person>``, ``meme``')
    embed.setColor('#0099ff')
    embed.setFooter('use ++ before each command!')
    
    message.channel.send(embed)
  }

  if (args[0] === 'info') {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('Chad Bot || Fun Commands')
    embed.setDescription('``hack <@person>``, ``meme``')
    embed.setColor('#0099ff')
    embed.setFooter('use ++ before each command!')
    
    message.channel.send(embed)
  }

  if (!args.length) {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('Chad Bot || Help')
    embed.setDescription('Here you can find a full list of the commands you can use along with some cool tips!')
    embed.addFields(
    { name: 'Fun 😄', value: '``++help fun``', inline: false },
    { name: 'Info ❓', value: '``++help info``', inline: false },
    )
    embed.setColor('#0099ff')
    
    message.channel.send(embed)
  }
}

module.exports.config = {
    name: "help",
    description: "Here you can find a full list of the commands you can use along with some cool tips!",
    usage: "++help",
    aliases: ['cmds']
}