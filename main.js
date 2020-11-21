const Discord = require('discord.js');
const settings = require('./botsettings.json');
const bot = new Discord.Client({
    ws: {
        intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES']
    }
});
const {
    loadCommands
} = require('./src/utils/loadCommands');
const mongoose = require('mongoose')
const prefix = require('./src/models/prefix');
const Levels = require('discord-xp')
const fs = require("fs");

let statuses = ["Chad Simulator", "Chad Tycoon", "https://discord.gg/AEGRMSS", "Being a Chad", "Living in ChadVille"]
bot.on("ready", () => {
    setInterval(function () {

        let status = statuses[Math.floor(Math.random() * statuses.length)]

        bot.user.setActivity(status, {
            type: 'PLAYING'
        });
    }, 10000)

    console.log(`${bot.user.username} is online`)
})

Levels.setURL('mongodb+srv://Brady1290:caniver1234@cluster0.bf245.mongodb.net/test')
mongoose.connect('mongodb+srv://Brady1290:caniver1234@cluster0.bf245.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000
})

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.snipes = new Discord.Collection();

loadCommands(bot);

bot.on('guildMemberRemove', guildMember => {
    Levels.deleteUser(guildMember.id, guildMember.guild.id);
})

bot.on("messageDelete", async (message) => {
    if (message.author.bot) return;
    const snipes = message.client.snipes.get(message.channel.id) || [];
    snipes.unshift({
        content: message.content,
        author: message.author,
        image: message.attachments.first() ?
            message.attachments.first().proxyURL :
            null,
        date: new Date().toLocaleString("en-GB", {
            dataStyle: "full",
            timeStyle: "short",
        }),
    });
    snipes.splice(10);
    message.client.snipes.set(message.channel.id, snipes);
})

bot.on('message', async (message) => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    let randomXp = Math.floor(Math.random() * 5) + 1
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`${message.author}, You leveled up to level ${user.level}! Keep it going!`);
    }

    const prefixData = await prefix.findOne({
        GuildID: message.guild.id
    });

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0].toString().toLowerCase();
    const args = messageArray.slice(1);

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time * 1000));
    }

    if (prefixData) {
        const prefix = prefixData.Prefix;

        if (!message.content.startsWith(prefix)) return;
        const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        if (!commandfile) return;
        commandfile.run(bot, message, args, delay);
    } else if (!prefixData) {
        const prefix = "++";

        if (!message.content.startsWith(prefix)) return;
        const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        if (!commandfile) return;
        commandfile.run(bot, message, args, delay);
    }
});

bot.on("guildCreate", async guild => {
    let defaultChannel = "";
    guild.channels.cache.forEach((channel) => {
        if (channel.type == "text" && defaultChannel == "") {
            if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                defaultChannel = channel;
            }
        };
    })

    const embed = new Discord.MessageEmbed()
    embed.setTitle('Thanks for adding me to your server!')
    embed.setColor("RANDOM")
    embed.setTimestamp()
    embed.setDescription("Hello! I'm chad bot. I am a fun bot and xp bot which is developed by one person. There is currently no way to support development but there may be soon. The default prefix is ++ but you can change it with ++setprefix <new prefix> if you have the Manage_Guild permission, to view a full list of commands do ++help. If you had invited this before to this server your custom prefix (if you had one) would have saved. That's all for now! Have fun!")
    defaultChannel.send(embed).catch(error => {
        return;
    })
})

bot.login(settings.token);