const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');


class YTPlayer
{
    constructor()
    {
        this.isPlaying = false;     
    }
    
    play(connection, message, server)
    {
        this.isPlaying = true;
        
        
            console.log("in play");
            server.dispatcher = connection.playStream(ytdl(server.queue[0], { audioonly: true }), { passes : 5 });
            server.queue.shift();
            server.dispatcher.on("start", function()
            {
                console.log("start event");
            });
            server.dispatcher.on("end", function()
            {
                
                this.isPlaying = false;
                console.log("in the end event" + this.isPlaying);
                if(server.queue[0])
                {
                    console.log("should play again");
                    this.play(connection, message, server);
                    
                }
                else
                {
                    console.log("should disconnect");
                    message.guild.voiceConnection.disconnect();                          
                }
            });
        }
      
    


    stopPlaying(server)
    {
        server.queue = [];
        this.isPlaying = false;
        console.log("stopped playing");
    }

    getIsPlaying()
    {
        return this.isPlaying;
    }

    setIsPlaying(value)
    {
        this.isPlaying = value;
    }

}



module.exports = new YTPlayer();