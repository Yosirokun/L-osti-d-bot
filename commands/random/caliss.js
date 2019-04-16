const commando = require('discord.js-commando');

class Caliss extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name:'caliss',
            group:'random',
            memberName:'caliss',
            description:'Dit caliss!'
        })
    }
    async run(message, args)
    {
        message.reply("Mon caliss!")
    }
}
module.exports = Caliss;