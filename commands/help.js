const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('Chad Bot || Help')
    embed.setDescription('Here you can find a full list of the commands you can use along with some cool tips!')
    embed.addFields(
		{ name: 'help', value: 'Gives you a list of commands.', inline: true },
    { name: 'hack <person>', value: 'Does a fake hack on the person you mention.', inline: true },
    { name: 'meme', value: 'Posts a random meme from any of the following subreddits: r/meme, r/me_irl, r/dankmeme, r/nocontextxboxmessages', inline: true },
    )
    embed.setColor('#0099ff')
    
    message.channel.send(embed)
}

module.exports.config = {
    name: "help",
    description: "Here you can find a full list of the commands you can use along with some cool tips!",
    usage: "++help",
    aliases: ['cmds']
}