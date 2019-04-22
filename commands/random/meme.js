const commando = require('discord.js-commando');
const got = require('got');

class Meme extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name:'meme',
            group:'random',
            memberName:'meme',
            description:'Envoi un criss de meme'
        })
    }
    async run(message, args)
    {
        got('https://www.reddit.com/r/dankmemes/random/.json')
        .then(response => {
            var content = JSON.parse(response.body);
            var image = content[0].data.children[0].data.url;
            message.reply("Tien mon bondieux " + image);
        }).catch(console.error);
        
    }
}
module.exports = Meme;