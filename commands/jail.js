const Discord = require('discord.js')
const Levels = require('discord-xp')
const usedCommand = new Set()

module.exports.run = async (bot, message, args) => {
    if (usedCommand.has(message.author.id)) {
        message.reply('Slow down! You have to wait 2 seconds to use this command again.')
    }
    else {
        const user = await this.bot.resolveUser(args[0]) || message.author;
        const m = await message.sendT("misc:PLEASE_WAIT", null, {
            prefixEmoji: "loading"
        });
        const buffer = await this.bot.AmeAPI.generate("jail", { url: user.displayAvatarURL({ format: "png", size: 1024 }) });
        const attachment = new Discord.MessageAttachment(buffer, "jail.png");
        m.delete();
        message.channel.send(attachment);
    }
    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 2000);
};

module.exports.config = {
    name: "jail",
    description: "Jails the person you mention!",
    usage: "++jail <user>",
    aliases: ["arrest"]
};