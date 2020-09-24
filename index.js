const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const bot = new Discord.Client({disableEveryone: true});
const mongoose = require('mongoose')
const Levels = require('discord-xp')

bot.on("ready", () => {
  console.log(`${bot.user.username} is online`)
  bot.user.setActivity("prefix is ++", {type: 'PLAYING'});
})

Levels.setURL("mongodb+srv://Brady1290:caniver1234@cluster0.7abfx.mongodb.net/test")

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

    const randomXp = Math.floor(Math.random() * 4) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        const embed = new Discord.MessageEmbed()
        .setTitle('+1 Chad Level!')
        .addField("New Level", `Your chad level is now ${user.level}! Keep it going!`)
        .setTimestamp()
        .setColor("#57b9ff")
        message.channel.send(embed);
    }

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0].toString().toLowerCase();
    const args = messageArray.slice(1);

        const prefix = "++";
        
        if (!message.content.startsWith(prefix)) return;
        const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        if (!commandfile) return;
        commandfile.run(bot, message, args);
})

bot.login(process.env.token);
