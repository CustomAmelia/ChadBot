const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = (bot, message, args) => {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
    if (rawLeaderboard.length < 1) return reply("Nobody's on the leaderboard yet.");

    const leaderboard = Levels.computeLeaderboard(bot, rawLeaderboard); 

    const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

    message.channel.send(`${lb.join("\n\n")}}`)
}

module.exports.config = {
    name: "leaderboard",
    description: "Gives you the list of the 5 highest levels in the server!",
    usage: "++leaderboard",
    aliases: ["lb"]
}