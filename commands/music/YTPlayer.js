const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');


class YTPlayer
{
    constructor()
    {
        this.isPlaying = false; 
        this.server = null; 
    }

     play(connection, message, server = null)
     {
        if(server != null)
        {
            this.server = server;
        }     
        console.log("isplaying in play: " + this.isPlaying); 
        if(this.isPlaying == false)
        {
            this.isPlaying = true;
            message.reply("Salut mon bon dieux!");
            try
            {
                console.log("in play");
                this.server.dispatcher = connection.playStream(ytdl(this.server.queue[0], { audioonly: true }), { passes : 5 });
                this.server.queue.shift();
                this.server.dispatcher.on("start", function()
                {
                    console.log("start event");
                });
                this.server.dispatcher.on("end", function()
                {
                   
                    this.isPlaying = false;
                    console.log("in the end event" + this.isPlaying + "queue length" + this.server.queue.length);
                    if(this.server.queue[0])
                    {
                        play(connection, message);
                    }
                    else
                    {
                        message.guild.voiceConnection.disconnect();                          
                    }
                });
            }
            catch(error)
            {
                console.log("an error has occured and the track cannot be played" + error);
            }
        }
      else
      {
        
      }
    }

    stopPlaying()
    {
        this.server.queue = [];
        this.isPlaying = false;
        console.log("stopped playing");
        console.log("server: " + this.server);
    }
    getIsPlaying()
    {
        return this.isPlaying;
    }

    setIsPlaying(value)
    {
        this.isPlaying = value;
    }

    addToQueue(message, link)
    {
        message.reply('ta toune est adder vieux');
        this.server.queue.push(link);
    }
}


module.exports = new YTPlayer();