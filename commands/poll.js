const Discord = require('discord.js')
const usedCommand = new Set()
const userCreatedPolls = new Map();

module.exports.run = async (bot, message, args, delay) => {
    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
        if (!message.author.id === '498097065264676864')
        return message.channel.send(
          `You do not have the correct permissions to run this command, ${message.author.username}`
        );

        function getPollOptions(collector) {
            return new Promise((resolve, reject) => {
                collector.on('end', collected => resolve(collected.map(m => m.content.toLowerCase())));
            });
        }

        function processPollResults(voteCollector, pollOptions, userVotes, pollTally) {
            return new Promise((resolve, reject) => {
                voteCollector.on('collect', msg => {
                    let option = msg.content.toLowerCase();
                    if(!userVotes.has(msg.author.id) && pollOptions.includes(option)) {
                        userVotes.set(msg.author.id, msg.content);
                        let voteCount = pollTally.get(option);
                        pollTally.set(option, ++voteCount);
                    }
                });
                voteCollector.on('end', collected => {
                    console.log("Collected " + collected.size + " votes.");
                    resolve(collected);
                })
            });
        }

        if(userCreatedPolls.has(message.author.id)) {
            message.channel.send("You already have a poll going on right now.");
            return;
        }
        message.channel.send("Enter options. Max 5. Type done when finished.");
        let filter = m => {
            if(m.author.id === message.author.id) {
                if(m.content.toLowerCase() === 'done') collector.stop();
                else return true;
            }
            else return false;
        }
        let collector = message.channel.createMessageCollector(filter, { maxMatches: 5 });
        let pollOptions = await getPollOptions(collector);
        if(pollOptions.length < 2) {
            message.channel.send("Not enough options, must contain 2!");
            return;
        }
        let embed = new Discord.MessageEmbed();
        embed.setTitle("Your Poll");
        embed.setDescription(pollOptions.join("\n"));
        let confirm = await message.channel.send(embed);
        
        await confirm.react('✅');
        await confirm.react('❎');

        let reactionFilter = (reaction, user) => (user.id === message.author.id) && !user.bot;
        let reaction = (await confirm.awaitReactions(reactionFilter, { max: 1 })).first();
        if(reaction.emoji.name === '✅') {
            message.channel.send("Poll will begin in 1 seconds.");
            await delay(1);
            message.channel.send("Vote now!");
            let userVotes = new Map();
            let pollTally = new discord.Collection(pollOptions.map(o => [o, 0]));
            let pollFilter = m => !m.bot;
            let voteCollector = message.channel.createMessageCollector(pollFilter, {
                time: 60000
            });
            userCreatedPolls.set(message.author.id, voteCollector);
            await processPollResults(voteCollector, pollOptions, userVotes, pollTally);
            let max = Math.max(...pollTally.array());
            console.log(pollTally.entries());
            let entries = [...pollTally.entries()];
            let winners = [];
            let embed = new Discord.MessageEmbed();
            let desc = '';
            entries.forEach(entry => entry[1] === max ? winners.push(entry[0]) : null);
            entries.forEach(entry => desc  += entry[0] + " received " + entry[1] + " votes(s)\n");
            embed.setDescription(desc);

            if(winners.length === 1) {
                message.channel.send(winners[0] + " is the winner!", embed);
            }
            else {
                message.channel.send("We have a draw!", embed);
            }
        }
        else if(reaction.emoji.name === '❎') {
            message.channel.send("Poll cancelled.");
        }
        await delay(20)
            userCreatedPolls.get(message.author.id).stop();
             userCreatedPolls.delete(message.author.id);
    }
}
    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 2000);
module.exports.config = {
    name: "poll",
    description: "I sawed this person in half!",
    usage: "++poll #channel pollmessage",
    aliases: []
};