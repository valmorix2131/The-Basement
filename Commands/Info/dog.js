const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "dog",
    description: "Gives you a picture of a dog.",
    // permission: "ADMINISTRATOR",
    /**
     * 
     * @param { MessageEmbed } message
     * @param { CommandInteraction } interaction
     */
    async execute(interaction) {

        const url = "https://some-random-api.ml/img/dog";

        let data, response;

        try{
            response = await axios.get(url);
            data = response.data;
        }catch (e) {
            return interaction.channel.send(`An error occured, please try again!`)
        }

        const dog = new MessageEmbed()
        .setTitle("🐶 Random Doggo")
        .setImage(data.link)

        await interaction.reply({ embeds: [dog]}) //.then(msg => { setTimeout(() => msg.delete(), 10000) })
    }
}