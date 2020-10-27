const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if (message.author.id !== '498097065264676864') return;
    const embed = new Discord.MessageEmbed()
        .setTitle('Evaluating...')
    const msg = await message.channel.send(embed);
    try {
        const data = eval(args.join(' ').replace(/```/g, ''));
        const embed = new Discord.MessageEmbed()
            embed.setTitle('Output: ')
            if (!data) {
                embed.setDescription("No code to eval!")
            }
            embed.setDescription(await data)
        await msg.edit(embed)
        await msg.react('✅')
        await msg.react('❌')
        const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
        msg.awaitReactions(filter, { max: 1 })
            .then((collected) => {
                collected.map((emoji) => {
                    switch (emoji._emoji.name) {
                        case '✅':
                            msg.reactions.removeAll();
                            break;
                        case '❌':
                            msg.delete()
                            break;
                    }
                })
            })
    } catch (e) {
        const embed = new Discord.MessageEmbed()
            .setTitle('An Error has occured')
        return await msg.edit(embed);
    }
}
module.exports.config = {
    name: "eval",
    description: "Evaluates code!",
    usage: "++eval",
    aliases: []
};