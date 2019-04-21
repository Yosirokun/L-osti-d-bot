const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');

class YTPlayer
{
    constructor()
    {

    }

     play(connection, message, server)
    { 
        try
        {
            server.dispatcher = connection.playStream(ytdl(server.queue[0], { audioonly: true }), { passes : 5 });
            server.queue.shift();
            server.dispatcher.on("end", function()
            {
                if(server.queue[0])
                {
                    play(connection, message, server);
                }
                else
                {
                    message.member.voiceChannel.leave();
                }
            })
            }
        catch(error)
        {
            console.log("an error has occured and the track cannot be played" + error);
        }
    }
}


module.exports = new YTPlayer();