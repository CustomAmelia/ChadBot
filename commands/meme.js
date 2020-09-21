const Discord = require("discord.js")
const got = require('got')
const botconfig = require("../botsettings.json");

module.exports.run = (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    const subreddits = ["meme", "me_irl", "dankmeme", "nocontextxboxmessages"]
    const subredditsrandom = subreddits[Math.floor(Math.random() * subreddits.length)];

    got(`https://www.reddit.com/r/${subredditsrandom}/random/.json`).then(response => {
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
        embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}  ||  From r/${subredditsrandom}`)
        message.channel.send(embed);
    })
}

module.exports.config = {
    name: "meme",
    description: "Posts a random meme from any of the following subreddits. r/meme, r/me_irl, r/dankmeme, r/nocontextxboxmessages",
    usage: "++meme",
    aliases: []
}