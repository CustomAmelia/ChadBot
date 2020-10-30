const Discord = require('discord.js')
const {
    stripIndents
} = require('common-tags')

module.exports.run = async (bot, message, args) => {
    let server = bot.guilds.cache.get('771048912881844244')
    let channel = server.channels.cache.get('771048912881844244')

    channel
    .fetchMessages({ limit: 1 })
    .then(f =>
      message.channel.send(
        f.first().content
      )
    );
}
module.exports.config = {
    name: "commits",
    description: "Shows the latest commits!",
    usage: "++commits",
    aliases: []
};