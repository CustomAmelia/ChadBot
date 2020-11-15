const Discord = require('discord.js')
const {
    inspect
} = require('util')
const {
    stripIndents
} = require('common-tags')
const {
    VultrexHaste
} = require('vultrex.haste')
const haste = new VultrexHaste({
    url: "https://hasteb.in"
})

module.exports.run = async (bot, message, args) => {
    if (message.author.id !== '498097065264676864') return;

    if (!args[0]) return message.channel.send('Please provide javascript code to run.')

    try {
        const start = process.hrtime()
        let output = eval(args.join(' '))
        const difference = process.hrtime(start)
        if (typeof output !== "string") output = inspect(output, {
            depth: 5
        })
        
        const embed = new Discord.MessageEmbed()
        .setTitle(`Executed In ${difference[0] > 0 ?`${difference[0]}s ` : ""} ${difference[1] / 1e6}ms`)
        .addField(stripIndents `
        Input:
        \`\`\`js\n${args.join(' ')}\`\`\`
        `)
        .addField(stripIndents `
        Output:
        \`\`\`js\n${output.length > 1950 ? await haste.post(output) : output}\`\`\`
        `)
        .setColor("RANDOM")

        message.channel.send(embed)
    } catch (err) {
        const embed = new Discord.MessageEmbed()
        .setTitle('Oops! Something went wrong.')
        .setColor("RANDOM")
        .setDescription(stripIndents `
        Error:
        \`\`\`js
        ${err}
        \`\`\`
        `)
        message.channel.send(embed)
    }
}
module.exports.config = {
    name: "eval",
    description: "Evaluates code!",
    usage: "++eval",
    aliases: []
};