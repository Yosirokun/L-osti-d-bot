const commando = require("discord.js-commando");
const ytdl = require("ytdl-core");

class YTPlayer {
	static async play(connection, message, server) {
		try {
			server.IsYTPlayerPlaying = true;
			console.log("in play");
			await this.playStream(connection, message, server);
		} catch (err) {
			message.reply("Ca a fucker ! Fucking caliss: " + err);
			console.log("an error as occured" + err);
		}
	}

	static skipSong(server) {
		console.log("Should end and skip the song");
		if (!server.queue[0]) {
			server.dispatcher.end();
			server.IsYTPlayerPlaying = false;
		} else {
			server.dispatcher.end();
		}
		console.log(
			"Stream : " +
				server.dispatcher.stream +
				" queue : " +
				server.queue +
				" isPlaying : " +
				server.IsYTPlayerPlaying
		);
	}

	static stopPlaying(server) {
		server.queue = [];
		server.IsYTPlayerPlaying = false;
		console.log("stopped playing");
	}

	static setEvents(connection, message, server) {
		server.dispatcher.on("start", function () {
			console.log("start event");
		});
		server.dispatcher.on("end", async function () {
			server.IsYTPlayerPlaying = false;
			console.log("in the end event" + server.IsYTPlayerPlaying);
			if (server.queue[0]) {
				console.log("should play again");
				await YTPlayer.play(connection, message, server);
			} else {
				console.log(message.channel);
				message.channel
					.send("J'ai fini de jouer! j... Décaliss!")
					.then((message) => {
						console.log(`Sent message: ${message.content}`);
						connection.disconnect();
					})
					.catch(console.error);
			}
		});
	}
	static async playStream(connection, message, server) {
		server.dispatcher = connection.playStream(
			ytdl(server.queue[0], { audioonly: true }),
			{ passes: 5 }
		);
		server.dispatcher.setBitrate("auto");
		this.setEvents(connection, message, server);
		server.queue.shift();
	}
}

module.exports = YTPlayer;
