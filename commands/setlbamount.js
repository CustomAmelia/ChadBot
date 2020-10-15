const Discord = require('discord.js')
const lbamount = require('../models/lbamount')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    const data = await lbamount.findOne({
        GuildID: message.guild.id
    });

    if(usedCommand.has(message.author.id)){
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    } else {
        if (!args[0]) return message.channel.send('Please provide an amount of users to display in the leaderboard.')

        if (args[0].length === 2) return message.channel.send('Your LB user amount must be under \`10\`!')

        if (args[0].length > 2) return message.channel.send('Your LB user amount must be under \`10\`!')

        if (args[0] === '0') return message.channel.send('Your LB user amount cannot be \`0\`!')

        if (message.member.hasPermission('MANAGE_GUILD')) {
            if (data) {
                await lbamount.findOneAndRemove({
                    GuildID: message.guild.id
                })

                message.channel.send(`The new LB amount is now ${args[0]}`)

                let newData = new lbamount({
                    Amount: args[0],
                    GuildID: message.guild.id
                })

                newData.save()
            }
            else if (!data) {
                message.channel.send(`The new LB amount is now ${args[0]}`)

                let newData = new lbamount({
                    Amount: args[0],
                    GuildID: message.guild.id
                })

                newData.save();
            }
            else {
                message.channel.send('LB User Amount must be under 10!')
            }
        }
        else if (!message.member.hasPermission('MANAGE_GUILD')) {
            message.channel.send('Uh Oh! You do not have the required permissions to run this command, you need the MANAGE_GUILD or ADMINISTRATOR permission!')
        }
    }
}

module.exports.config = {
    name: "setlbamount",
    description: "Lets you change the amount of people shown in the lb.!",
    usage: "++setlbamount <amount>",
    aliases: []
};