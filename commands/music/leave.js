const commando = require('discord.js-commando');
const player = require('./YTPlayer');

class Decaliss extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name:'decaliss',
            group:'music',
            memberName:'decaliss',
            description:'decaliss du channel'
        })
    }
    async run(message, args)
    {
       if(message.guild.voiceConnection)
       {
            message.reply("Okay jmenva mon ciboire!");
            message.guild.voiceConnection.disconnect();
            if(player.getIsPlaying())
                player.stopPlaying(servers[message.guild.id]);
       }
       else
       {
            message.reply("Jmeme pas la caliss!");
       }
    }
}
module.exports = Decaliss;