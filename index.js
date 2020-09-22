const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const bot = new Discord.Client({disableEveryone: true});
const mongoose = require('mongoose')
const prefix = '../models/prefix'

bot.on("ready", () => {
  console.log(`${bot.user.username} is online`)
  bot.user.setActivity("PLACEHOLDER", {type: 'PLAYING'});
})

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

client.on('message', async (message) => {
    if (message.author.bot) return;

    const data = await prefix.findOne({
        GuildID: message.guild.id
    });

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    if(data) {
        const prefix = data.Prefix;

        if (!message.content.startsWith(prefix)) return;
        const commandfile = client.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        commandfile.run(client, message, args);
    } else if (!data) {
        const prefix = "++";
        
        if (!message.content.startsWith(prefix)) return;
        const commandfile = client.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        commandfile.run(client, message, args);
    }
})

bot.login(process.env.token);
