const { CommandInteraction, MessageEmbed, Client } = require('discord.js');

module.exports = {
    name: "seek",
    description: "Seeks the song to a specified position.",
    value: "seek",
    options: [
        {
            name: "time",
            description: "Provide a position (in seconds) to seek.",
            type: "NUMBER",
            required: true
        },
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;
        const queue = await client.distube.getQueue(VoiceChannel);
        const Time = options.getNumber("time");

        if(!VoiceChannel)
        return interaction.reply({embeds: [new MessageEmbed().setColor('#f4424b').setDescription("<a:animated_cross:902802381803249684> **You must be in a voice channel to be able to use this command.**")]})

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({emwbeds: [new MessageEmbed().setColor('#f4424b').setDescription(`<a:animated_cross:902802381803249684> **I am already playing music in <#${guild.me.voice.channelId}>.**`)]})

        try{

            await queue.seek(Time);
            return interaction.reply({ embeds: [new MessageEmbed().setColor('#00ffe4').setDescription(`<a:animated_check:902802437646221313> **Seeked to \`${Time}\`**`)]});

        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("#f4424b")
            .setDescription(`<a:animated_cross:902802381803249684> **Error:** ${e}`)
            return interaction.reply({embeds: [errorEmbed]});
        }
    }
}