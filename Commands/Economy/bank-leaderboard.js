const { MessageEmbed } = require("discord.js");
const eco = require("../../Structures/Handlers/Economy");

module.exports = {
    name: "bank-leaderboard",
    description: "Shows leaderboard",
    userPermissions: ["SEND_MESSAGES"],
    category: "Economy",

    execute: async (interaction, client, args) => {
        const { member, guild } = interaction;

        let lb = eco.bank.leaderboard(guild.id);
        if(!lb.length){
            return interaction.reply(`Cannot generate a leaderboard: the server database is empty.`)
        }
        let leaderboard = await lb.map((value, index) => {
            return `\`${index + 1 }\`<@${value.userID}>'s Coins: **${value.money}**`
        })

        interaction.reply({embeds: [
            new MessageEmbed()
            .setColor("AQUA")                
            .setDescription(leaderboard.join("\n"))
            .setTitle(`Bank Leaderboard for **${guild.name}**`)
            .setTimestamp()
            .setFooter({ text: `discord.gg/basementph`})
        ]})
    }
}