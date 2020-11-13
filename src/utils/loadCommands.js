const fs = require('fs');

function loadCommands(bot) {
    fs.readdir('./src/commands', (error, Category) => {
        if (error) throw error;
        Category.forEach((category) => {
          fs.readdir(`./src/commands/${category}`, (err, commands) => {
            if (err) throw err;
      
            commands.forEach((command) => {
              const cmd = require(`../commands/${category}/${command}`);
      
              bot.commands.set(cmd.config.name, cmd);
              cmd.config.aliases.forEach((alias) => {
                bot.aliases.set(alias, cmd.config.name);
              });
            });
          });
        });
      });
}

module.exports = {
    loadCommands
}