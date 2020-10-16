const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const bot = new Discord.Client({
    disableEveryone: true
});
const mongoose = require('mongoose')
const prefix = require('./models/prefix');
const Levels = require('discord-xp')

let statuses = ["Chad Simulator", "Chad Tycoon", "https://discord.gg/AEGRMSS"]
bot.on("ready", () => {
    setInterval(function () {

        let status = statuses[Math.floor(Math.random() * statuses.length)]

        bot.user.setActivity(status, {
            type: 'PLAYING'
        });
    }, 10000)

    console.log(`${bot.user.username} is online`)
})

Levels.setURL("mongodb+srv://Brady1290:caniver1234@cluster0.bf245.mongodb.net/test")
mongoose.connect('mongodb+srv://Brady1290:caniver1234@cluster0.bf245.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const fs = require("fs");

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

bot.on('guildMemberRemove', guildMember => {
    Levels.deleteUser(guildMember.id, guildMember.guild.id);
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

    const data = await prefix.findOne({
        GuildID: message.guild.id
    });

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0].toString().toLowerCase();
    const args = messageArray.slice(1);

    if (data) {
        const prefix = data.Prefix;

        if (!message.content.startsWith(prefix)) return;
        const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        if (!commandfile) return;
        commandfile.run(bot, message, args);
    } else if (!data) {
        const prefix = "chad ";

        if (!message.content.startsWith(prefix)) return;
        const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        if (!commandfile) return;
        commandfile.run(bot, message, args);
    }
})

bot.on("guildCreate", async guild => {
    let defaultChannel = "";
    guild.channels.cache.forEach((channel) => {
        if (channel.type == "text" && defaultChannel == "") {
            if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                defaultChannel = channel;
            }
        }
    })

    const data = await prefix.findOne({
        GuildID: guild.id
    });

    const embed = new Discord.MessageEmbed()
    embed.setTitle('Thanks for adding me to your server!')
    embed.setColor("RANDOM")
    embed.setTimestamp()
    embed.setDescription("Hello! I'm chad bot. I am a fun bot and xp bot which is developed by one person. There is currently no way to support development but there may be soon. The default prefix is chad but you can change it with chad setprefix <new prefix> if you have the Manage_Guild permission, to view a full list of commands do chad help. If you had invited this before to this server your custom prefix (if you had one) would have saved. Remember to use chad help for commands. That's all for now! Have fun!")
    defaultChannel.send(embed).catch(error => {
        return;
    })
})

bot.login(process.env.token);