const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");

const channelID = '940912767098056704' // PUT YOUR CHANNEL ID HERE. THE EMBED WILL BE SENT TO THIS CHANNEL FOR CONTROLLING VOICE ROOMS WITH BUTTONS.

module.exports = {
  name: "vcsetup",
  description: "Setup Voice Rooms.",
  permission: "ADMINISTRATOR",

  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {

    const { guild } = interaction;
    
    const Embed = new MessageEmbed()
    .setColor("BLUE")
    .setAuthor({name: "🔊 Voice Rooms"})
    .setDescription(`Use custom voice rooms to have a separate voice channel just for you and your friends! 
    
    ▫ ️Use the \`/vc\` command to configure your voice room.`)
    .setFooter({text: `Use the buttons below to control your voice room.`, iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})

    const Buttons = new MessageActionRow();
    Buttons.addComponents(
    new MessageButton()
      .setCustomId("hide")
      .setLabel("Hide")
      .setStyle("DANGER")
      .setEmoji("⛔"),
    new MessageButton()
      .setCustomId("unhide")
      .setLabel("Unhide")
      .setStyle("PRIMARY")
      .setEmoji("👁️"),
    new MessageButton()
      .setCustomId("public")
      .setLabel("Public")
      .setStyle("SUCCESS")
      .setEmoji("🔓"),
    new MessageButton()
      .setCustomId("private")
      .setLabel("Private")
      .setStyle("PRIMARY")
      .setEmoji("🔒"),
    );

    const Buttons2 = new MessageActionRow();
    Buttons2.addComponents(
    new MessageButton()
      .setCustomId("increase")
      .setLabel("Increase Limit")
      .setStyle("SECONDARY")
      .setEmoji("➕"),
    new MessageButton()
      .setCustomId("decrease")
      .setLabel("Decrease Limit")
      .setStyle("SECONDARY")
      .setEmoji("➖"),
    );

    await guild.channels.cache.get(`${channelID}`).send({embeds: [Embed], components: [Buttons,Buttons2]});

    interaction.reply({ content: "Voice rooms setup complete.", epheneram: true})
  }
}