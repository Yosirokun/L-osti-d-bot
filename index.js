const Commando = require('discord.js-commando');
const config = require('./config.json');
const bot = new Commando.Client({
    commandPrefix: config.Prefix
    });
bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

global.servers = {};

bot.on('ready', function()
{
    bot.user.setActivity(config.Activity); 
    console.log("Le bot run!");
});



bot.login(config.Token);
