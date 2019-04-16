const commando = require('discord.js-commando');

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
                message.member.voiceChannel.join()
                .then(connection =>{
                    message.reply("Salut mon bon dieux!");
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