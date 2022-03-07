const { Message, MessageEmbed, Guild } = require("discord.js");
const DB = require("../../Structures/Schemas/AFKSystem")

module.exports = {
    name: 'messageCreate',
    /**
     * 
     * @param {Message} message 
     */
    async execute(message) {
        if(message.author.bot) return;


        const checkafk = await DB.findOne({Guild: message.guild.id, User: message.author.id})
    
        if(checkafk) {
            checkafk.delete()
    
            const dataDeletedEmbed = new MessageEmbed()
            .setDescription(`<:peepohappy:949346477065510962> You are no longer AFK!`)
            .setColor('BLUE')
    
    
            message.channel.send({embeds: [dataDeletedEmbed]})
        }
    
        const mentionedUser = message.mentions.users.first();
        if(mentionedUser) {

           const data = await DB.findOne({Guild: message.guild.id, User: mentionedUser.id})
    
            if(data) {
                const embed = new MessageEmbed()
                .setTitle(`<:madThoonk:949347831188193300> ${mentionedUser.username} is currently AFK!`)
                .setColor('YELLOW')
                .setDescription(`Reason: ${data.Reason} \n Since: <t:${Math.round(data.Date / 1000)}:R>`)
    
                message.channel.send({embeds: [embed]})
            }
        }
    }
}