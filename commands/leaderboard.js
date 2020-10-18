const Discord = require('discord.js')
const Levels = require('discord-xp')
const usedCommand = new Set()
const lbamount = require('../models/lbamount')

module.exports.run = async (bot, message, args) => {
    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {

        const data = await lbamount.findOne({
            GuildID: message.guild.id
        });

    if (data) {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, data.Amount);

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = Levels.computeLeaderboard(bot, rawLeaderboard);
    
        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);
    
        const embed = new Discord.MessageEmbed()
        embed.setTitle(`${message.guild.name}'s Leaderboard`)
        embed.setDescription(lb.join("\n\n"))
        embed.setColor("RANDOM")
    
        message.channel.send(embed)
    }
    else if (!data) {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = Levels.computeLeaderboard(bot, rawLeaderboard);
    
        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);
    
        const embed = new Discord.MessageEmbed()
        embed.setTitle(`${message.guild.name}'s Leaderboard`)
        embed.setDescription(lb.join("\n\n"))
        embed.setColor("RANDOM")
    
        message.channel.send(embed).catch(error => {
            message.channel.send(`LEADERBOARD[ERROR]: ${error} CHECK THAT YOUR LBAMOUNT IS NOT SET TO AN EXTREMELY HIGH AMOUNT LIKE 100, 10 OR 20 IS RECOMMENDED`)
        })
    }
    }
    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 2000);
};

module.exports.config = {
    name: "leaderboard",
    description: "Gives you a list of the 5 highest leaderboard users!",
    usage: "++leaderboard",
    aliases: ["lb"]
};