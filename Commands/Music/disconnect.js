const { CommandInteraction, MessageEmbed, Client } = require('discord.js');

module.exports = {
    name: "disconnect",
    description: "Disconnects the bot from voice channel.",
    value: "stop",

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;
        const queue = await client.distube.getQueue(VoiceChannel);

        if(!VoiceChannel)
        return interaction.reply({embeds: [new MessageEmbed().setColor('#f4424b').setDescription("<a:animated_cross:902802381803249684> **You must be in a voice channel to be able to use this command.**")]})

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({embeds: [new MessageEmbed().setColor('#f4424b').setDescription(`<a:animated_cross:902802381803249684> **I am already playing music in <#${guild.me.voice.channelId}>.**`)]})

        try{

            await queue.stop(VoiceChannel);
            return interaction.reply({ embeds: [new MessageEmbed().setColor('#00ffe4').setDescription("<a:animated_check:902802437646221313> **Stopped The Music & Left The Voice Channel.**")]});

        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("#f4424b")
            .setDescription(`<a:animated_cross:902802381803249684> **Error:** ${e}`)
            return interaction.reply({embeds: [errorEmbed]});
        }
    }
}