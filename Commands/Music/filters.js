const { CommandInteraction, MessageEmbed, Client } = require('discord.js');

module.exports = {
    name: "filters",
    description: "Apply filters to the music.",
    options: [
        {
            name: "set",
            description: "Set filters to the song.",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Turn off all the filters",
                    value: "false"
                },
                {
                    name: "Toggle 8D Filter",
                    value: "8d"
                },
                {
                    name: "Toggle bassboost Filter",
                    value: "bassboost"
                },
                {
                    name: "Toggle echo filter",
                    value: "echo"
                },
                {
                    name: "Toggle nightcore filter",
                    value: "nightcore"
                },
                {
                    name: "Toggle surround filter",
                    value: "surround"
                },
            ],
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
        const choices = interaction.options.getString("set");
        

        if(!VoiceChannel)
        return interaction.reply({embeds: [new MessageEmbed().setColor('#f4424b').setDescription("<a:animated_cross:902802381803249684> **You must be in a voice channel to be able to use this command.**")]})

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({embeds: [new MessageEmbed().setColor('#f4424b').setDescription(`<a:animated_cross:902802381803249684> **I am already playing music in <#${guild.me.voice.channelId}>.**`)]})

        try{
            switch(choices) {
                case "false" : {
                    queue.setFilter(false);
                    return interaction.reply({ embeds: [new MessageEmbed().setColor('#00ffe4').setDescription(`<a:animated_check:902802437646221313> **Turned off all the filters.**`)]});
                }
                case "8d" : {
                    queue.setFilter(`3d`);
                    return interaction.reply({ embeds: [new MessageEmbed().setColor('#00ffe4').setDescription(`<a:animated_check:902802437646221313> **Toggled the 8D filter.**`)]});
                }
                case "bassboost" : {
                    queue.setFilter(`bassboost`);
                    return interaction.reply({ embeds: [new MessageEmbed().setColor('#00ffe4').setDescription(`<a:animated_check:902802437646221313> **Toggled the bassboost filter.**`)]});
                }
                case "echo" : {
                    queue.setFilter(`echo`);
                    return interaction.reply({ embeds: [new MessageEmbed().setColor('#00ffe4').setDescription(`<a:animated_check:902802437646221313> **Toggled the echo filter.**`)]});
                }
                case "nightcore" : {
                    queue.setFilter(`nightcore`);
                    return interaction.reply({ embeds: [new MessageEmbed().setColor('#00ffe4').setDescription(`<a:animated_check:902802437646221313> **Toggled the nightcore filter.**`)]});
                }
                case "surround" : {
                    queue.setFilter(`surround`);
                    return interaction.reply({ embeds: [new MessageEmbed().setColor('#00ffe4').setDescription(`<a:animated_check:902802437646221313> **Toggled the surround filter.**`)]});
                }
            }
        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("#f4424b")
            .setDescription(`<a:animated_cross:902802381803249684> **Error:** ${e}`)
            return interaction.reply({embeds: [errorEmbed]});
        }
    }
}