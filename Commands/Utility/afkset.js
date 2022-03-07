const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/AFKSystem");

module.exports = {
    name: 'afkset',
    description: 'Set your status to afk',
    options: [
        {
            name: 'reason',
            description: 'reason why you go afk',
            type: 'STRING',
            required: false
        }
    ], 
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Message} message 
     */
    async execute(interaction, message) {
        const reason = interaction.options.getString('reason') || 'No reason'
        
        const params = {
            Guild: interaction.guild.id,
            User: interaction.user.id
        }

        DB.findOne({params}, async(err, data) => {
            if(err)
            throw err;
            if(data) {
                data.delete()
                interaction.reply({content: `${interaction.user} you are no longer afk`, ephemeral: false})
            } else {
                new DB({
                    Guild: interaction.guild.id,
                    User: interaction.user.id,
                    Reason: reason,
                    Date: Date.now()
                }).save();
                interaction.reply({content: `<:afk:935143789574619146> You are now afk for \`${reason}\``})
            }
        })
    }
}