const { MessageEmbed } = require("discord.js");
const eco = require("../../Structures/Handlers/Economy");

module.exports = {
    name: "eco-help",
    description: "Shows economy commands",
    userPermissions: ["SEND_MESSAGES"],
    category: "Economy",

    execute: async (interaction, client, args) => {
        const helpEmbed = new MessageEmbed()
        .setDescription('**__Bot Commands:__**\n/eco-help\n/balance\n/daily\n/weekly\n/work\n/leaderboard\n/bank-leaderboard\n/withdraw\n/deposit\n/shop\n/inventory')
        .setColor("GREEN")


        interaction.reply({embeds: [helpEmbed]})
    }
}