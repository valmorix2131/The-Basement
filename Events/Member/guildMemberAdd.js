const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const ms = require('ms');
const timeSpan = ms('3 days'); // change to however many days you want! **MS DOESN'T SUPPORT MONTHS OR YEARS**

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {GuildMember} member
     */
     
     // if you followed lyx welcome message he didn't have async which we now need to await for the dm to be sent to the user before we kick them! 
    async execute(member) {    
        const createdAt = new Date(member.user.createdAt).getTime();
        const difference = Date.now() - createdAt;
        const reason = "Alt Account"

        const { user, guild } = member;
    
          Welcome = new WebhookClient({
            id: "949167460282671114",
             token: 'yKAsiS-BxgkBKVWKCktPMWTEcckpPX5LKmevGPugHrAj7L951zO-s6PsADByzRxO2cku'
         });

        const WelcomeEmbed = new MessageEmbed()
         .setColor("GREEN")
        .setAuthor({ name: user.tag, iconURL: user.avatarURL({dynamic: true, size: 512})})
         .setThumbnail(user.displayAvatarURL({dynamic: true, size:256}))
        .setDescription(`Welcome to __**${guild.name}**__ ${member}. Please kindly read the server rule at <#934791730337808435> and don't forget to get your roles at <#942725909058818069>, also read this where you can see every detail in every role <#943866977280200724> \n\n » Come join us in [VC](https://discord.gg/cEbPRYVEys)`)
        .setFooter({ text: `We currently have ${guild.memberCount} Members! | discord.gg/basementph`});

        Welcome.send({embeds: [WelcomeEmbed]}); // <------ add ";" a the end!
        
        const dm = new MessageEmbed()
        
          // you could change this to ban instead of kick! just do member.ban instead of what we have member.kick, and change the title of the embed 0: 
        .setTitle(`Kicked From ${member.guild.name}!`)
        .setColor("RED")
        .setDescription(`Accounts Less Than A Three Day's Old Aren't Allowed in ${member.guild.name}`)
        .setFields(
            {
                name: "Reason", value: reason,
            },
            {
                name: "Created", value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`
            }
        )
        if(difference < timeSpan) {
            await member.send({embeds: [dm]})
            await member.kick(reason)
        
        
        
        
         }
     }
 }