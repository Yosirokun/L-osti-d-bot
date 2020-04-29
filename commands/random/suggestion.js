const commando = require('discord.js-commando');
const issueManager = require('github-create-issue');
const config = require('../../config.json');

class Suggestion extends commando.Command
{
    constructor(client)
    {
        super(client, 
            {
                name:'ajoute',
                group:'random',
                memberName:'ajoute',
                description:'Ajoute une suggestion pour le bot'
            });
    }

    async run(message, args)
    {
        var opts = {
            'token': config.GitToken
        };
        if(!args)
        {
            message.reply('Faut que tu me dise quoi ajouter criss de raisin!');
            return;
        }

        issueManager('Yosirokun/L-osti-d-bot', args, opts, this.issueCallback);
        message.reply('Ta demande pour ajouter : ' + args + ', est rentrer mon bondieu!');
    }

    issueCallback(error, issue, info)
    {
            // Check for rate limit information...
        if ( info ) {
            console.error( 'Limit: %d', info.limit );
            console.error( 'Remaining: %d', info.remaining );
            console.error( 'Reset: %s', (new Date( info.reset*1000 )).toISOString() );
        }
        if ( error ) {
            throw new Error( error.message );
        }
        console.log( JSON.stringify( issue ) );
        // returns <issue_data>
        }
}
module.exports = Suggestion;