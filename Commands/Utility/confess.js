const { CommandInteraction, MessageEmbed } = require('discord.js');
const confessions = require('../../Structures/Schemas/confession');

module.exports = {
    name: 'confess',
    description: 'Send an anonymous confession to the confession channel!',
    options: [
        {
            name: 'input',
            description: 'Type your confession here!',
            type: 'STRING',
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild, options, member } = interaction;
        const confessionChannel          = guild.channels.cache.get('950038161298452501');
        const confessionLogChannel       = guild.channels.cache.get('950622046012981268');
        const confessionString           = options.getString('input');
        const confessionId               = (await confessions.countDocuments() + 1).toString();

        confessions.create({
            guildId: guild.id,
            memberId: member.id,
            confessionId: confessionId,
            confession: confessionString
        });

        confessionChannel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle(`<a:JDC_confess:950038969675042857> | Anonymous Confession #${confessionId}`)
                    .setDescription(confessionString)
                    .setColor("AQUA")
                    .setFooter({text: `/confess (message)`})
                    .setTimestamp()
            ]
        });
        
        interaction.reply({
            content: 'Anonymous confession successfully sent!',
            ephemeral: true
        });

        confessionLogChannel.send({
            content: `📤 | Confession from ${member}`,
            embeds: [
                new MessageEmbed()
                    .setTitle(`🐦 | Anonymous Confession #${confessionId}`)
                    .setDescription(confessionString)
                    .setColor("YELLOW")
                    .setTimestamp()
            ]
        })
    }
}