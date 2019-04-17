const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');

function play(connection, message, server)
{
    
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function()
    {
        if(server.queue[0])
        {
            play(connection, message, server);
        }
        else
        {
           
        }
    })
}

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
                    play(connection, message, server);
                })
            }
        }
        else
        {
            message.reply("t'est pas dans un channel mon bon dieux!");
        }
        
    }
}
module.exports = Play;