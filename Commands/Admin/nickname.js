const { MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
  name: "nickname",
  description: "Change the nickname of the selected target",
  permission: "MANAGE_NICKNAMES",
  options: [
    {
      name: "target",
      description: "Select a target",
      type: "USER",
      required: true,
    },
    {
      name: "nickname",
      description: "Type a nickname",
      type: "STRING",
      required: true,
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    try {
      const { guild, member } = interaction;
      const { options } = interaction;
      const target = options.getMember("target");
      const nick = options.getString("nickname");

      if (target.permissions.has("ADMINISTRATOR"))
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `<a:cross:949499323559841872> | ${member} you can't change an Admin/Bot's nickname`
              )
              .setColor("RED"),
          ],
        });

      target.setNickname(nick);

      const NickName = new MessageEmbed()
        .setAuthor({
          name: `${guild}`,
          iconURL: guild.iconURL({
            dynamic: true,
          }),
        })
        .setColor("#f88ac1")
        .setDescription(
          `<a:check:949499244207824936> | You changed ${target.user.username}'s nickname to (**${nick}**)`
        );

      interaction.channel.send({
        embeds: [NickName],
      });

      interaction.reply({
        content: "Done",
        ephemeral: true,
      });
    } catch (err) {
      interaction.reply({
        content: `\`\`\`${err}\`\`\``,
        ephemeral: true,
      });
    }
  },
};
