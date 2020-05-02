const commando = require("discord.js-commando");
const player = require("./YTPlayer");

class Play extends commando.Command {
	constructor(client) {
		super(client, {
			name: "play",
			group: "music",
			memberName: "play",
			description: "ca joue de la criss de music",
		});
	}

	async run(message, args) {
		try {
			if (message.member.voiceChannel) {
				if (!message.guild.voiceChannel) {
					if (!servers[message.guild.id]) {
						servers[message.guild.id] = { queue: [] };
					}
					message.member.voiceChannel.join().then((connection) => {
						if (args) {
							var server = servers[message.guild.id];
							console.log("get isPlaying: " + server.IsYTPlayerPlaying);
							if (!server.IsYTPlayerPlaying) {
								server.queue.push(args);
								message.reply("Salut mon bon dieux!");
								player.play(connection, message, server);
							} else {
								message.reply("ta toune est adder vieux");
								server.queue.push(args);
								console.log("queue: " + server.queue);
							}
						} else {
							message.reply("tu m'a pas donné dtoune mon seigneur");
							message.member.voiceChannel.disconnect();
						}
					});
				}
			} else {
				message.reply("t'est pas dans un channel mon bon dieux!");
			}
		} catch (error) {
			console.log("an error has occured" + error);
		}
	}
}
module.exports = Play;
