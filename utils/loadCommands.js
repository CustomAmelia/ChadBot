const fs = require('fs');

function loadCommands(bot) {
    fs.readdir("./commands/", (error, Category) => {
        if (error) throw error;
        Category.forEach((category) => {
          fs.readdir(`./commands/${category}`, (err, commands) => {
            if (err) throw err;
      
            commands.forEach((command) => {
              const cmd = require(`../commands/${category}/${command}`);
      
              client.commands.set(cmd.config.name, cmd);
              cmd.config.aliases.forEach((alias) => {
                client.aliases.set(alias, cmd.config.name);
              });
            });
          });
        });
      });
}

module.exports = {
    loadCommands
}