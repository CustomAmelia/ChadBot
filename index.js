const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const bot = new Discord.Client({disableEveryone: true});
const mongoose = require('mongoose')
const prefix = require('./models/prefix');

bot.on("ready", () => {
  console.log(`${bot.user.username} is online`)
  bot.user.setActivity("Chad Simulator", {type: 'PLAYING'});
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

bot.on('guildMemberRemove', (guildMember) => {

    if (guildMember.bot) return;

    Levels.deleteUser(guildMember.id, guildMember.guild.id);
})

bot.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    const data = await prefix.findOne({
        GuildID: message.guild.id
    });

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0].toString().toLowerCase();
    const args = messageArray.slice(1);

    if (data) {
        const prefix = data.Prefix;
        const prefix2 = `${data.Prefix} `

        if (!message.content.startsWith(prefix)) return;
        if (prefix2) {
        const commandfile = bot.commands.get(cmd.slice(prefix2.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix2.length)));
        if (!commandfile) return;
        commandfile.run(bot, message, args);
        }
        else if (prefix) {
            const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
            if (!commandfile) return;
            commandfile.run(bot, message, args);
        }
    }
    else if (!data) {
        const prefix = "++";
        const prefix2 = "++ "
        
        if (!message.content.startsWith(prefix)) return;
        if (prefix) {
        const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        if (!commandfile) return;
        commandfile.run(bot, message, args);
        }
        else if (prefix2) {
            const commandfile = bot.commands.get(cmd.slice(prefix2.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix2.length)));
            if (!commandfile) return;
            commandfile.run(bot, message, args);
        }
    }
})

bot.on("guildCreate", async guild => {
    let defaultChannel = "";
    guild.channels.cache.forEach((channel) => {
      if(channel.type == "text" && defaultChannel == "") {
        if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
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
    if (!data) {
        embed.setDescription("Hello! I'm chad bot. I am a fun bot which is developed by currently one person. There is currently no way to support development but there may be soon. The default prefix is ++ but you can change it with ++setprefix <new prefix> if you have the Manage_Servers permission, to view a full list of commands do ++help. If you had invited this before to this server your custom prefix (if you had one) would have saved. Remember to use ++help not ++ help for commands. That's all for now! Have fun!")
    }
    else if (data) {
        embed.setDescription(`Hello! I'm chad bot. I am a fun bot which is developed by currently one person. There is currently no way to support development but there may be soon. The default prefix is ++ but you can change it with ${data.Prefix}setprefix <new prefix> if you have the Manage_Servers permission, to view a full list of commands do ${data.Prefix}help. If you had invited this before to this server your custom prefix (if you had one) would have saved. Remember to use ${data.Prefix}help not ${data.Prefix} help for commands. That's all for now! Have fun!`)
    }
    defaultChannel.send(embed).catch(error => {
        return;
    })
})

bot.login(process.env.token);
