const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
    const person = message.mentions.users.first();

    if (!person) return message.channel.send('Please specify the user you want to set the level to and the level amount.')

    if (!args[1]) return message.channel.send('Please specify the user you want to set the level to and the level amount.')

    if (message.member.hasPermission('MANAGE_GUILD')) {
        message.channel.send('Done!')

        Levels.setLevel(person.user.id, message.guild.id, args[1]);
    }
    else return message.channel.send('Uh Oh! You do not have the required permissions to run this command, you need the MANAGE_GUILD or ADMINISTRATOR permission!')
}

module.exports.config = {
    name: "setlevel",
    description: "Sets the level for the person you specify and the amount you specify.",
    usage: "++setlevel <user>",
    aliases: []
};