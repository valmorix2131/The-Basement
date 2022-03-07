const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        
        const { user , guild} = member;

        member.roles.add("934801412011982888");
        
        const Welcomer = new WebhookClient({
            id: "949167460282671114",
            token: "yKAsiS-BxgkBKVWKCktPMWTEcckpPX5LKmevGPugHrAj7L951zO-s6PsADByzRxO2cku"
        });

        const Welcome = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor({ name: user.tag, iconURL: user.avatarURL({dynamic: true, size: 512})})
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Welcome ${member} to the **${guild.name}**!\n
        Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setFooter({ text: `ID: ${user.id}`});

        Welcomer.send({embeds: [Welcome]})
    }
}
