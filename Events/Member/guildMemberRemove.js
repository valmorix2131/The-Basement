const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        
        const { user , guild} = member;
        
        const Leave = new WebhookClient({
            id: "949167460282671114",
            token: "yKAsiS-BxgkBKVWKCktPMWTEcckpPX5LKmevGPugHrAj7L951zO-s6PsADByzRxO2cku"
        });

        const Welcome = new MessageEmbed()
        .setColor("RED")
        .setAuthor({ name: user.tag, iconURL: user.avatarURL({dynamic: true, size: 512})})
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        ${member} has left the server\n
        Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setFooter({ text: `ID: ${user.id}`});

        Leave.send({embeds: [Welcome]})
    }
}