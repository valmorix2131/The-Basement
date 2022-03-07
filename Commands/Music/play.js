const { CommandInteraction, MessageEmbed, Client } = require('discord.js');

module.exports = {
    name: "play",
    description: "Plays a song/Adds a song to the queue.",
    options: [
        {name: "query",
        description: "Provide a song name or link.",
        type: "STRING",
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
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("<a:animated_cross:902802381803249684> **You must be in a voice channel to be able to use this command.**")]})

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`<a:animated_cross:902802381803249684> **I am already playing music in <#${guild.me.voice.channelId}>.**`)]})

        try{
            client.distube.play( VoiceChannel, options.getString("query"), { textChannel: channel, member: member});
            return interaction.reply({embeds: [new MessageEmbed()
            .setColor("GREEN")
            .setDescription("<a:animated_check:902802437646221313> **Your request has been received.**")]})

        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`<a:animated_cross:902802381803249684> **Error:** ${e}`)
            return interaction.reply({embeds: [errorEmbed]});
        }
    }
}