const Commando = require('discord.js-commando');
const bot = new Commando.Client();
const config = require('./config.json');

bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

global.servers = {};

bot.on('ready', function()
{
    console.log("Le bot run!");
});



bot.login(config.Token);