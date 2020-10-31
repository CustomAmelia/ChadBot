const Discord = require('discord.js')
const settings = require('../botsettings.json');
const fetch = require('node-fetch')
const usedCommand = new Set()

module.exports.run = async (bot, message, args, delay) => {
    if (usedCommand.has(message.author.id)) {
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
        if (!args[0]) return message.channel.send('Please specify a query.')
        if (!args[1]) {
            let src = await message.channel.send("No src provided! Will search using the default 'stable' one. This message will be deleted in 4 seconds.")
            await delay(4)
            src.delete()
            const queryParams = new URLSearchParams({ src: 'stable', q: args[0] })

            const embed = await fetch(`https://djsdocs.sorta.moe/v2/embed?${queryParams.toString()}`)
            .then(res => res.json())
      
          message.channel.send({ embed })
        }
        else if (args[1]) {
            const queryParams = new URLSearchParams({ src: args[1], q: args[0] })

            const embed = await fetch(`https://djsdocs.sorta.moe/v2/embed?${queryParams.toString()}`)
            .then(res => res.json())
      
          message.channel.send({ embed })
        }
    }
    usedCommand.add(message.author.id)
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 2000);
}

module.exports.config = {
    name: "djsdocs",
    description: "Retrivies discord.js docs.",
    usage: "++djsdocs <info>",
    aliases: ["docs", "djs"]
};