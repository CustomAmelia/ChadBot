const Discord = require("discord.js")
const botconfig = require("../../botsettings.json");
const prefix = require('../../models/prefix');
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
  if (usedCommand.has(message.author.id)) {
    message.reply('Slow down! You have to wait 2 seconds to use this command again.')
  } else {

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
      } else if (data) {
        embed.setFooter(`use ${data.Prefix} before each command!`)
      }

      message.channel.send(embed)
    }

    if (args[0] === 'utility') {
      const embed = new Discord.MessageEmbed()
      embed.setTitle('**🛠️ Utility Commands**')
      embed.setDescription('``help``, ``invite``, ``suggest <suggestion>``, ``bugreport <bug>``, ``server``, ``ping``, ``botinfo``, ``snipe / snipe <number>``, ``whois <user> / whois')
      embed.setColor('RANDOM')
      if (!data) {
        embed.setFooter('use ++ before each command')
      } else if (data) {
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
      } else if (data) {
        embed.setFooter(`use ${data.Prefix} before each command!`)
      }

      message.channel.send(embed)
    }

    if (args[0] === 'xp') {
      const embed = new Discord.MessageEmbed()
      embed.setTitle('**🔵 XP Commands**')
      embed.setDescription('``rank / rank @user``, ``leaderboard``')
      embed.setColor('RANDOM')
      if (!data) {
        embed.setFooter('use ++ before each command')
      } else if (data) {
        embed.setFooter(`use ${data.Prefix} before each command!`)
      }

      message.channel.send(embed)
    }

    if (args[0] === 'dev') {
      const embed = new Discord.MessageEmbed()
      embed.setTitle('**⌨️ Developer Commands**')
      embed.setDescription('``djsdocs <query> <src> (src is not required)``')
      embed.setColor('RANDOM')
      if (!data) {
        embed.setFooter('use ++ before each command')
      } else if (data) {
        embed.setFooter(`use ${data.Prefix} before each command!`)
      }

      message.channel.send(embed)
    }

    if (!args.length) {
      const embed = new Discord.MessageEmbed()
      embed.setTitle('**Chad Bot Command List**')
      embed.setColor('RANDOM')
      if (!data) {
        embed.addField("😂 **Fun**", "``++help fun``")
        embed.addField("🛠️ **Utility**", "``++help utility``")
        embed.addField("⚙️ **Config**", "``++help config``")
        embed.addField("🔵 **XP**", "``++help xp``")
        embed.addField("⌨️ **Dev**", "``++help dev``")
      } else if (data) {
        embed.addField("😂 **Fun**", "``" + data.Prefix + "help fun``")
        embed.addField("🛠️ **Utility**", "``" + data.Prefix + "help utility``")
        embed.addField("⚙️ **Config**", "``" + data.Prefix + "help config``")
        embed.addField("🔵 **XP**", "``" + data.Prefix + "help xp``")
        embed.addField("⌨️ **Dev**", "``" + data.Prefix + "help dev``")
      }
      message.channel.send(embed)
    }

    usedCommand.add(message.author.id);
    setTimeout(() => {
      usedCommand.delete(message.author.id);
    }, 2000);
  }
}

module.exports.config = {
  name: "help",
  description: "Here you can find a full list of the commands you can use along with some cool tips!",
  usage: "++help",
  aliases: ['cmds']
}