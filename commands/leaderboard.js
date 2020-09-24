const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
    if (rawLeaderboard.length < 1) return reply("Nobody's on the chad leaderboard yet.");

    const leaderboard = Levels.computeLeaderboard(bot, rawLeaderboard); 

    const lb = leaderboard.map(e => `\ ${e.position} • ${e.username}#${e.discriminator}\nChad Level: ${e.level}\nXP: ${e.xp.toLocaleString()} \ `)
    const embed = new Discord.MessageEmbed()
    .setTitle(`**${message.guild.name}'s Leaderboard**`)
    .setDescription(`${lb.join("\n\n")}`)
    .setTimestamp()
    .setColor("#57b9ff")
    message.channel.send(embed)
}

module.exports.config = {
    name: "leaderboard",
    description: "Gives you the list of the 5 highest chad levels in the server!",
    usage: "++leaderboard",
    aliases: ["lb"]
}