const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let role = message.guild.roles.cache.find(role => role.name === "AFK");
    const embed = new Discord.MessageEmbed()
    embed.setTitle('AFK Setup')
    embed.setDescription('To setup the afk command, make a new role and name it "AFK" and then when you have done that, run this command again to see if it has been setup. Make sure I (ChadBot) has the Administrator permission!')
    embed.setColor("RANDOM")

    if (!role) return message.channel.send(embed)
    if (role) return message.channel.send('The AFK command is already set up!')
}

module.exports.config = {
    name: "afksetup",
    description: "Setup the AFK command!",
    usage: "++afksetup",
    aliases: []
};