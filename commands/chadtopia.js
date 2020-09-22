const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {
    function wait (time) {
        return new Promise(resolve => setTimeout(resolve, time * 1000));
    }
      if (!hacked) return message.channel.send("Please specify a person you would like me to hack! 😎")

      const hacked = message.mentions.users.first();

      message.channel.send(`Hacking ${hacked.username}! 😎`).then(async msg => {
          await wait(1)
          msg.edit('Stealing Passwords! 🔑')
          await wait(1)
          msg.edit('Stealing Discord account! 🔒')
          await wait(1)
          msg.edit('Stealing Reddit Account! 🔒')
          await wait(1)
          msg.edit('Leaking IP! IP is 69.69.69.69.12')
          await wait(1)
          msg.edit(`${hacked.username} has been hacked! 😎`)
      })
}

module.exports.config = {
    name: "hack",
    description: "Posts a random meme from r/Chadtopia",
    usage: "++hack <mention person>",
    aliases: []
}