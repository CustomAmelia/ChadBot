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

        message.channel.send(stripIndents `
        *Executed In ${difference[0] > 0 ?`${difference[0]}s ` : ""} ${difference[1] / 1e6}ms*
        \`\`\`js
        ${output.length > 1950 ? await haste.post(output) : output}
        \`\`\`
        `)
    } catch (err) {
        return message.channel.send(stripIndents `
        Error:
        \`\`\`js
        ${err}
        \`\`\`
        `)
    }
}
module.exports.config = {
    name: "eval",
    description: "Evaluates code!",
    usage: "++eval",
    aliases: []
};