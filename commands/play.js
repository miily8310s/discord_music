module.exports = {
  name: "play",
  description: "Play Youtube!",
  execute(message, args) {
    const ytdl = require("ytdl-core");

    if (message.channel.type !== "text") return;

    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.reply("please join a voice channel first!");
    }

    if (args.length == 0) {
      return message.reply("please write a youtube's video link!");
    }

    if (
      args[0].match(
        /^http(s):\/\/(www.youtube.com\/watch\?v=|youtu.be\/)(.+)/
      ) === null
    ) {
      return message.reply("please write youtube link!");
    }

    voiceChannel.join().then((connection) => {
      const stream = ytdl(ytdl.getURLVideoID(args[0]), {
        quality: "highestaudio",
        filter: "audioonly",
      });
      const dispatcher = connection.play(stream);

      dispatcher.on("end", () => voiceChannel.leave());
    });
  },
};
