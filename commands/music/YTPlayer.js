const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');

function play (connection, message, server)
{
    server.dispatcher = connection.playStream(ytdl(server.queue[0], { audioonly: true }), { passes : 5});
    server.dispatcher.setBitrate('auto');
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
    
    skipSong(server)
    {
        console.log("Should end and skip the song");
        if(!server.queue[0])
        {
            server.dispatcher.end();
            this.isPlaying = false;
        }
        else 
        {
            server.dispatcher.end();
        }
        console.log("Stream : " + server.dispatcher.stream + " queue : " + server.queue + " isPlaying : " + this.isPlaying);
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