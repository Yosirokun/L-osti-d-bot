const commando = require('discord.js-commando');
const player = require('./YTPlayer');

class Play extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name:'play',
            group:'music',
            memberName:'play',
            description:'ca joue de la criss de music'
        })
    }
    
    async run(message, args)
    {
        try{
            if(message.member.voiceChannel)
            {
                if(!message.guild.voiceChannel)
                {
                    if(!servers[message.guild.id])
                    {
                        servers[message.guild.id] = {queue: []};
                    }
                    message.member.voiceChannel.join()
                    .then(connection =>{
                        message.reply("Salut mon bon dieux!");
                        var server = servers[message.guild.id]
                        server.queue.push(args);
                        player.play(connection, message, server);
                    })
                }
            }
            else
            {
                message.reply("t'est pas dans un channel mon bon dieux!");
            }
        }
        catch(error)
        {
            console.log("an error has occured" + error);
        } 
    }
}
module.exports = Play;