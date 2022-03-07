const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

const currency = '₱'
// ${currency}

module.exports = {
  name: "balance",
  usage: "/balance",
  description: "Check a user's current balance.",
  options: [
    {
      name: 'user',
      description: "Select a user to view their balance.",
      type: "USER",
      required: false
    }
  ],
  /**
   * 
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {

    const target = interaction.options.getUser("user") || interaction.user
    
    let balance = await cs.balance({
      user: target,
      guild: interaction.guild.id,
    });

    const balformat = balance.wallet.toLocaleString();
    const banformat = balance.bank.toLocaleString();
   
    const embed = new MessageEmbed()
    .setColor("GREEN")
    .setAuthor({ name: `💸 ${target.username}'s Balance`, iconURL: `${target.displayAvatarURL({dynamic: true, size: 512})}`})
    .addField("💰 Wallet", `${currency}${balformat}`, true)
    .addField("💳 Bank", `${currency}${banformat}`, true)
    .setFooter({text: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})
    .setTimestamp();

    interaction.reply({embeds: [embed]})
  }
}