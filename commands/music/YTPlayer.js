const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');

function play (connection, message, server)
{
    server.dispatcher = connection.playStream(ytdl(server.queue[0], { audioonly: true }), { passes : 5 });
    setEvents(connection, message, server);
    server.queue.shift();
}
function setEvents(connection, message, server)
{
    server.dispatcher.on("start", function()
            {
                console.log("start event");
            });
            server.dispatcher.on("end",async function()
            {               
                this.isPlaying = false;
                console.log("in the end event" + this.isPlaying);
                if(server.queue[0])
                {
                    console.log("should play again");
                    await play(connection, message, server);     
                }
                else
                {
                    console.log("should disconnect");
                    message.guild.voiceConnection.disconnect();                          
                }
            });
}
class YTPlayer
{
    constructor()
    {
        this.isPlaying = false;     
    }
    
    async play(connection, message, server)
    {
        try{
            this.isPlaying = true;         
            console.log("in play");
            play(connection, message, server);                     
        }
        catch(err){console.log("an error as occured" + err);}
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