const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
    const person = message.mentions.users.first();

    if (!person) return message.channel.send('Please specify the user you want to set the xp to and the xp amount.')

    if (!args[0]) return message.channel.send('Please specify the user you want to set the xp to and the xp amount.')

    if (message.member.hasPermission('MANAGE_GUILD')) {
        message.channel.send('Done!')

        Levels.setXp(person.user.id, message.guild.id, args[0]);
    }
    else return message.channel.send('Uh Oh! You do not have the required permissions to run this command, you need the MANAGE_GUILD or ADMINISTRATOR permission!')
}

module.exports.config = {
    name: "setxp",
    description: "Sets the xp for the person you specify and the amount you specify.",
    usage: "++setxp <user>",
    aliases: []
};