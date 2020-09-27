const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
    if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

    const leaderboard = Levels.computeLeaderboard(bot, rawLeaderboard); 

    const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

    message.channel.send(`${lb.join("\n\n")}}`)
}

module.exports.config = {
    name: "leaderboard",
    description: "Gives you a list of the 10 highest leaderboard users!",
    usage: "++leaderboard",
    aliases: ["lb"]
};