const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'lockdown',
    description: 'Locks channel',
    permission: 'ADMINISTRATOR',
    options: [
        {
            name: 'state',
            description: 'lock/unlock the channel',
            required: true,
            type: 'STRING',
            choices: [
                {
                    name: 'lock',
                    description: 'Lock the given channel',
                    value: 'lock',
                },
                {
                    name: 'unlock',
                    description: 'Lock the given channel',
                    value: 'unlock',
                },
            ],
        },
        {
            name: 'channel',
            description: 'Select a channel to lock',
            required: true,
            type: 'CHANNEL',
        },
        {
            name: 'reason',
            description: 'The reason for locking the channel',
            required: false,
            type: 'STRING',
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) { 
        const state = interaction.options.getString('state')
        const reason = interaction.options.getString('reason') || 'None provided'
        const Channel = interaction.options.getChannel('channel')
        const role = interaction.guild.roles.everyone;
        
        if (state === 'lock') {      
            Channel.permissionOverwrites.edit(role, {SEND_MESSAGES: false}) // this can be set to 'null' which will make the permission for sending messages gray
        
            const lockEmbed = new MessageEmbed()
                .setDescription(`:lock: Channel locked by ${interaction.user.tag}`)
                .addField('**Reason:**', `${reason}`)
                .setColor('#ff9913')
                .setImage("https://cdn.discordapp.com/attachments/941686089041711164/949194452763807794/mickey-mouse-locked-out.gif")
                .setTimestamp()
                if (Channel) {
                   Channel.send({embeds: [lockEmbed]})  
                    return interaction.reply('Channel locked.')
              } 
            }
        if (state === 'unlock'){
            Channel.permissionOverwrites.edit(role, {SEND_MESSAGES: true}) // or 'null'})
                    } 
            const unlockEmbed = new MessageEmbed()
                .setDescription(`:unlock: Channel unlocked by ${interaction.user.tag}`)
                .addField('**Reason:**', `${reason}`)
                .setColor('#ff9913')
                .setImage("https://media.discordapp.net/attachments/941686089041711164/949194153571528724/giphy.gif")
                .setTimestamp()              
                if (Channel) {
                   Channel.send({embeds: [unlockEmbed]})
                    return interaction.reply('Channel unlocked.')
                }
            }
        }