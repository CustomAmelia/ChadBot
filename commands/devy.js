const Discord = require('discord.js')
const cheerio = require('cheerio')

module.exports.run = async (bot, message, args) => {
    let youtubechannelurl = 'https://www.youtube.com/channel/UCve8CeZ4ivtLRCpnU2zTKyQ';
    let response = await request(youtubechannelurl)
    let $ = cheerio.load(response)
    let subscriberCount = $('[class="yt-subscription-button-subscriber-count-branded-horizontal subscribed yt-uix-tooltip"]').attr('title');
    message.reply(`Devy Has ${subscriberCount} subcribers on YouTube!`)
}

module.exports.config = {
    name: "devy",
    description: "test",
    usage: "lol",
    aliases: []
}