const ytdl = require("ytdl-core");
const config = require("../../config.json");
const searchApi = require("youtube-search");
const searchYoutube = require("youtube-api-v3-search");

class YTPlayer {
	static async play(connection, message, server) {
		try {
			server.IsYTPlayerPlaying = true;
			server.stoppedManualy = false;
			console.log("in play");
			await this.playStream(connection, message, server);
		} catch (err) {
			if (err.message.includes("No video id found")) {
				server.queue.shift();
				if (!server.queue[0]) {
					server.IsYTPlayerPlaying = false;
					message.channel
						.send(
							"La toune est pas trouvable pis ya plus rien à jouer. Jdecriss!"
						)
						.then((message) => {
							console.log(`Sent message: ${message.content}`);
							connection.disconnect();
						})
						.catch(console.error);
				} else {
					this.play(connection, message, server);
				}
			} else {
				message.reply("Ca a fucker ! Fucking caliss: " + err);
				console.log("an error as occured" + err);
			}
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
		server.stoppedManualy = true;
		server.IsYTPlayerPlaying = false;
		console.log("stopped playing");
	}

	static isAYoutubeLink(link) {
		return link.toLowerCase().indexOf("youtube.com") > -1;
	}

	static async searchVideo(name, connection, message, server, cb) {
		const options = {
			q: name,
			type: "video",
		};

		await searchYoutube(config.YoutubeApiKey, options).then((results) => {
			var videos = results.items;
			console.log(videos);
			var videoNamesIds = [];
			var i = 0;
			for (i = 0; i < videos.length; i++) {
				videoNamesIds.push({
					name: videos[i].snippet.title,
					id: videos[i].id.videoId,
				});
			}
			console.log(videoNamesIds);
			var stringChoice = "Choisie quelle tu veux mon seigneur! \n";
			for (i = 0; i < videoNamesIds || i < 3; i++) {
				stringChoice =
					stringChoice + (i + 1) + ": " + videoNamesIds[i].name + "\n";
			}
			var filter = (m) => m != null;
			message.reply(stringChoice).then(() => {
				message.channel
					.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
					.then((collected) => {
						console.log("collected: " + collected.first());
						if (collected.first() == "1") {
							cb(
								connection,
								message,
								server,
								"https://www.youtube.com/watch?v=" + videoNamesIds[0].id
							);
						} else if (collected.first() == "2") {
							cb(
								connection,
								message,
								server,
								"https://www.youtube.com/watch?v=" + videoNamesIds[1].id
							);
						} else if (collected.first() == "3") {
							cb(
								connection,
								message,
								server,
								"https://www.youtube.com/watch?v=" + videoNamesIds[2].id
							);
						} else {
							message.channel.send(
								"caliss t'avait juste à choisir dans la crisse de liste!"
							);
						}
					})
					.catch((err) => {
						console.log(err);
						message.channel.send("Ta été ben trop long à repondre caliss!");
					});
			});
		});
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
				if (!server.stoppedManualy) {
					message.channel
						.send("J'ai fini de jouer! j... Décaliss!")
						.then((message) => {
							console.log(`Sent message: ${message.content}`);
							connection.disconnect();
						})
						.catch(console.error);
				}
			}
		});
	}
	static async playStream(connection, message, server) {
		console.log("Toune qui va partir: " + server.queue[0]);
		server.dispatcher = connection.playStream(
			ytdl(server.queue[0], { audioonly: true }),
			{ volume: false, bitrate: "auto" }
		);

		this.setEvents(connection, message, server);
		server.queue.shift();
	}
}

module.exports = YTPlayer;
