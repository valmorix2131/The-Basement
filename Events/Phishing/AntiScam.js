const { Message, MessageEmbed, Client } = require("discord.js");
const config = require("../../Structures/config.json");

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   */
  async execute(message) {
    const array = require(`../../Structures/Validation/scam.json`);
    if (array.some((word) => message.content.toLowerCase().includes(word))) {
      message.delete();
      const embed = new MessageEmbed()
        .setTitle("Unknown link detected")
        .setColor(config.Warna)
        .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
        .setDescription(`Please don't send any Unknown Links. Thank you.`)
        .addField("User:", `\`\`\`${message.author.tag} (${message.author.id})\`\`\``)
        .addField("Message Content:", `\`\`\`${message.content}\`\`\``)
        .setFooter({ text: "Automatically delete messages after 1 minute" });
      
      await message.channel
        .send({
          embeds: [embed],
        })
        .then((m) => {
          setTimeout(() => {
            m.delete();
          }, 60 * 1000);
        });
    }
  },
};
