const { MessageEmbed, CommandInteraction } = require("discord.js");
const ms                                   = require("ms");

module.exports = {
    name: "slowmode",
    description: "Slows down the message rate. If no rate is supplied the mode will simply be toggled on/off.",
    permission: "ADMINISTRATOR", 
    options: [
        {
            name: "rate",
            description: "Provide the rate at which the user can send a new message, e.g 5s, 1m, 30m, etc.",
            type: "STRING",
            required: false
        },
        {
            name: "duration",
            description: "Provide a duration for the slowmode between 10 seconds to 24 days, e.g 10s, 1m, 30m, 2h, 7d, etc.",
            type: "STRING",
            required: false
        },
        {
            name: "reason",
            description: "Provide a reason for why you activated slowmode.",
            type: "STRING",
            required: false
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        let   message;
        const { channel, options } = interaction;
        const response             = new MessageEmbed();
        const minRate              = ms("5s");
        const maxRate              = ms("6h");
        const minDuration          = ms("10s");
        const maxDuration          = ms("24d");
        const rate                 = options.getString("rate") && ms(options.getString("rate")) ? ms(options.getString("rate")) : 0;
        const duration             = options.getString("duration") && ms(options.getString("duration")) ? ms(options.getString("duration")) : 0;
        const reason               = options.getString("reason") || "None provided";
        const enabledMessage       = duration ? `Slowmode has been set to a rate of ${ms(rate || minRate, { long: true })} for ${ms(duration, { long: true })}` 
                                              : `Slowmode has been set to a rate of ${ms(rate || minRate, { long: true })}`;
        const description          = `${enabledMessage}. **Reason:** ${reason}.`;
        
        response.setTitle("Slowmode")
            .setColor("GREEN")
            .setDescription(description);

        const handleDuration = () => {
            if (duration)
                setTimeout(async () => {
                    if (rate / 1000 === channel.rateLimitPerUser)
                        channel.setRateLimitPerUser(0);
                }, duration);
        };

        if (duration && (duration < minDuration || duration > maxDuration)) {
            response.setDescription([
                `Duration must be between ${ms(minDuration, { long: true })} and ${ms(maxDuration, { long: true })}.`,
                "Example durations: *10s, 1m, 2h, 7d*, etc., or alternatively in milliseconds."
            ].join("\n"));
            return interaction.reply({ embeds: [response], ephemeral: true });
        }

        if (!rate) {
            response.setDescription(channel.rateLimitPerUser ? `Slowmode has been disabled.` : description);
            channel.rateLimitPerUser ? channel.setRateLimitPerUser(0) : channel.setRateLimitPerUser(minRate / 1000);
            message = await interaction.reply({ embeds: [response], fetchReply: true });
            handleDuration();
                
            return setTimeout(() => message.delete().catch(() => {}), 7000);
        }

        if (rate < minRate || rate > maxRate) {
            response.setDescription([
                `Rate must be between ${ms(minRate, { long: true })} and ${ms(maxRate, { long: true })}.`,
                "Example rates: *10s, 1m, 2h*, etc., or alternatively in milliseconds."
            ].join("\n"));
            return interaction.reply({ embeds: [response], ephemeral: true });
        }

        channel.setRateLimitPerUser(rate / 1000, reason);
        message = await interaction.reply({ embeds: [response], fetchReply: true });
        setTimeout(() => message.delete().catch(() => {}), 7000);
        handleDuration();
    }
}