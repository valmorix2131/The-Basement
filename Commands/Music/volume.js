const { CommandInteraction, MessageEmbed, Client } = require('discord.js');

module.exports = {
    name: "volume",
    description: "Changes the volume of the music.",
    options: [
        {name: "percent",
        description: "Provide a percentage of volume for the bot(1-100).",
        type: "NUMBER",
        required: true}
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel)
        return interaction.reply({embeds: [new MessageEmbed().setColor('#f4424b').setDescription("<a:animated_cross:902802381803249684> **You must be in a voice channel to be able to use this command.**")]})

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({embeds: [new MessageEmbed().setColor('#f4424b').setDescription(`<a:animated_cross:902802381803249684> **I am already playing music in <#${guild.me.voice.channelId}>.**`)]})

        try{
            const Volume = options.getNumber("percent");
            if(Volume > 100 || Volume < 1)
            return interaction.reply({embeds: [new MessageEmbed().setColor('#f4424b').setDescription("<a:animated_cross:902802381803249684> **You have to specify a number between 1 and 100.**")]});

            client.distube.setVolume(VoiceChannel, Volume);
            return interaction.reply({ embeds: [new MessageEmbed().setColor('#00ffe4').setDescription(`<a:animated_check:902802437646221313> **Volume set to** \`${Volume}%\``)]});

        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("#f4424b")
            .setDescription(`<a:animated_cross:902802381803249684> **Error:** ${e}`)
            return interaction.reply({embeds: [errorEmbed]});
        }
    }
}