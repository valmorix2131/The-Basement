const { Client, Collection} = require("discord.js");
const client = new Client({intents: 32767});     
const { Token } = require("./config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { YtDlpPlugin } = require("@distube/yt-dlp")
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

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

CurrencySystem.cs
  .on('debug', (debug, error) => {
    console.log(debug);
    if (error) console.error(error);
  })

cs.setMongoURL(`mongodb+srv://leunel:Valmorix2131@thebasement.kcj9a.mongodb.net/thebasement?retryWrites=true&w=majority`); // PUT YOUR MONGOOSE URL HERE
cs.setDefaultBankAmount(200);
cs.setDefaultWalletAmount(200);
cs.setMaxBankAmount(20000);
cs.setMaxWalletAmount(10000);

client.login(Token);