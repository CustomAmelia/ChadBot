const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Chad Bot || Help')
    .setDescription('Here you can find a full list of the commands you can use along with some cool tips!')
    .addFields(
		{ name: 'help', value: 'Gives you a list of commands.', inline: true },
		{ name: 'test', value: 'test', inline: true },
	)
}

message.channel.send(embed)

module.exports.config = {
    name: "help",
    description: "Here you can find a full list of the commands you can use along with some cool tips!",
    usage: "++help",
    aliases: ['cmds']
}