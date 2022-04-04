const { Client, Collection} = require("discord.js");
const client = new Client({intents: 32767});     
const { Token } = require("./config.json");
const { promisify } = require("util");
const keepAlive = require('./server.js')
keepAlive()
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { YtDlpPlugin } = require("@distube/yt-dlp")

client.commands = new Collection()
client.voiceGenerator = new Collection();

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

client.distube = new DisTube(client, {
  leaveOnStop: true,
  leaveOnFinish: false,
  leaveOnEmpty: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  youtubeDL: false,
  plugins: [
    new YtDlpPlugin({
      updateYouTubeDL: true,
    }),
    new SpotifyPlugin({ emitEventsAfterFetching: true }),
    new SoundCloudPlugin(),
  ],
});
module.exports = client;

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(process.env.Token);