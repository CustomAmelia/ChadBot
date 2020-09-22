const Discord = require("discord.js")
const got = require('got')
const botconfig = require("../botsettings.json");

module.exports.run = (bot, message, args) => {
    const embed = new Discord.MessageEmbed()

    got(`https://www.reddit.com/r/Chadtopia/random/.json`).then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.setTitle(`${memeTitle}`)
        embed.setURL(`${memeUrl}`)
        embed.setImage(memeImage)
        embed.setColor('RANDOM')
        embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}  ||  From r/Chadtopia`)
        message.channel.send(embed);
    })
}

module.exports.config = {
    name: "chadtopia",
    description: "Posts a random meme from r/Chadtopia",
    usage: "++chadtopia",
    aliases: []
}