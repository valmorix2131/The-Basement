const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "cat",
    description: "Gives you a picture of a kitten.",
    // permission: "ADMINISTRATOR",
    /**
     * 
     * @param { MessageEmbed } message
     * @param { CommandInteraction } interaction
     */
    async execute(interaction) {

        const url = "https://some-random-api.ml/img/cat/";

        let data, response;

        try{
            response = await axios.get(url);
            data = response.data;
        }catch (e) {
            return interaction.channel.send(`An error occured, please try again!`)
        }

        const kitten = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("😺 Random Kitten")
        .setImage(data.link)

        await interaction.reply({ embeds: [kitten]}) //.then(msg => { setTimeout(() => msg.delete(), 10000) })
    }
}