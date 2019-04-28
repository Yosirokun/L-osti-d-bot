const commando = require('discord.js-commando');
const player = require('./YTPlayer');

class Skip extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name:'skip',
            group:'music',
            memberName:'skip',
            description:'skip la toune qui joue live'
        })
    }
    async run(message, args)
    {
        if(message.member.voiceChannel)
        {
            
            if(message.guild.voiceConnection)
            {
                var server = servers[message.guild.id]; 
                console.log("get isPlaying: " + player.isPlaying);
                if(!player.getIsPlaying()) 
                {
                    message.reply("ya rien qui joue mon bon dieux!")
                }
                else
                {
                    player.skipSong(server);
                }
                
            }
            else
            {
                message.reply("jui meme pas la caliss!");
            }               
        }
        else
        {
            message.reply("Tayeule t meme pas la!");
        }
    }
}
module.exports = Skip;