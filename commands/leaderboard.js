const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
    if (rawLeaderboard.length < 1) return reply("Nobody's on the leaderboard yet.");

    const leaderboard = Levels.computeLeaderboard(bot, rawLeaderboard); 

    const lb = leaderboard.map(person => `${person.position}. ${person.username}#${person.discriminator}\nLevel: ${person.level}\nXP: ${person.xp.toLocaleString()}`);

    message.channel.send(`${lb.join("\n\n")}`)
}

module.exports.config = {
    name: "leaderboard",
    description: "Gives you the list of the 5 highest levels in the server!",
    usage: "++leaderboard",
    aliases: ["lb"]
}