const Discord = require('discord.js')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    const role = message.guild.roles.cache.get(args[0])

    if (!role) return message.channel.send('Please provide a role id.')

    message.author.roles.cache.remove(role)

    message.channel.send('Done.')
}

module.exports.config = {
    name: "delrole",
    description: "Deletes the role you want it to!",
    usage: "++delrole <role>",
    aliases: []
};