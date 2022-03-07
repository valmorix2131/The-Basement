const { CommandInteraction, MessageEmbed, Client } = require('discord.js');

module.exports = {
    name: "queue",
    description: "Shows the first 10 songs of the queue.",
    value: "queue",

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

            return interaction.reply({ embeds: [new MessageEmbed()
                .setColor('#00ffe4')
                .setDescription(`${queue.songs.slice(0, 20).map(
                    (song, id) => `\n**${id + 1}.** ${song.name} - \`${song.formattedDuration}\``)}`
                    )]});

        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("#f4424b")
            .setDescription(`<a:animated_cross:902802381803249684> **Error:** ${e}`)
            return interaction.reply({embeds: [errorEmbed]});
        }
    }
}