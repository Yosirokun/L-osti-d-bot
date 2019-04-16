const Commando = require('discord.js-commando');
const bot = new Commando.Client();
const Token = 'NTY3ODI5NDU3NzEzNDk2MDc1.XLZR5g.7cL1zxii7vvIoCz-uV-1hn2gtXY'

bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.on('ready', function()
{
    console.log("Le bot run!");
});



bot.login(Token);