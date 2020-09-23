const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const bot = new Discord.Client({disableEveryone: true});
const mongoose = require('mongoose')
const prefix = require('./models/prefix')
const Levels = require('discord-xp')

bot.on("ready", () => {
  console.log(`${bot.user.username} is online`)
  bot.user.setActivity("prefix is ++ or custom prefix", {type: 'PLAYING'});
})

Levels.setURL("mongodb+srv://Brady1290:caniver1234@cluster0.7abfx.mongodb.net/test")

mongoose.connect('mongodb+srv://Brady1290:caniver1234@cluster0.bf245.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => { 

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
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

bot.on('message', async (message) => {
    if (message.author.bot) return;

    const data = await prefix.findOne({
        GuildID: message.guild.id
    })

    const randomXp = Math.floor(math.random() * 9) + 1; //Random amont of XP until the number you want + 1
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You leveled up to ${user.level}! Keep it going!`);
    }

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0].toString().toLowerCase();
    const args = messageArray.slice(1);

    if(data) {
        const prefix = data.Prefix;

        if (!prefix) return;
        if (!message.content.startsWith(prefix)) return;
        const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        if (!commandfile) return;
        commandfile.run(bot, message, args);
    } else if (!data) {
        const prefix = "++";
        
        if (!message.content.startsWith(prefix)) return;
        const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        commandfile.run(bot, message, args);
    }
})

bot.login(process.env.token);
