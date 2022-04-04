const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
	name: "help",
	description: "Displays you a list of commands",
	usage: "/help", //Add usage like this to your commands
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
		async execute(interaction) {
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
			.setCustomId('helpPreviousPage')
			.setLabel("\u200b")
			.setStyle("SECONDARY")
			.setEmoji("◀️"),
			new MessageButton()
			.setCustomId('helpNextPage')
			.setLabel("\u200b")
			.setStyle("SECONDARY")
			.setEmoji("▶️"),
		)
		const Commands = []
		readdirSync("./Commands").forEach((folder) => {
			readdirSync(`./Commands/${folder}`).forEach((file) => {
				const command = require(`../../Commands/${folder}/${file}`);
				if (command.context || !command.name) return;
				Commands.push(command);
			})
		})
		const Embeds = [];
		let page = 0;
		const CommandsLength = Commands.length;
		const chunkSize = 25;
		for (let i = 0; i < CommandsLength; i += chunkSize) {
			const chunk = Commands.slice(i, i + chunkSize);
			const Response = new MessageEmbed()
			.setColor("GREYPLE")
			.setTitle(`List of commands: (${Embeds.length+1}/${Math.ceil(Commands.length/chunkSize)})`)
			chunk.forEach((ChunkCommand) => {
				const upperCaseName = ChunkCommand.name.charAt(0).toUpperCase() + ChunkCommand.name.slice(1);
				Response.addField(`${upperCaseName}`, `*Usage*: \`${ChunkCommand.usage || "Usage not provided"}\`\n*Description*: ${ChunkCommand.description || "Description not provided"}`, true)
			})
			Embeds.push(Response);
		}
		await interaction.reply({embeds: [Embeds[page]], components: [row]});

		const iFilter = i => i.user.id === interaction.user.id;

		const collector = interaction.channel.createMessageComponentCollector({filter: iFilter, time: 15000});

		collector.on('collect', async i => {
			if(i.customId === "helpNextPage"){
				page ++;
				if (page>Embeds.length-1) {
					page=0;
				}
				await i.update({embeds: [Embeds[page]], components: [row]});
			} else if(i.customId === "helpPreviousPage") {
				page --;
				if (page<0){
					page=(Embeds.length)-1;
				}
				await i.update({embeds: [Embeds[page]], components: [row]});
			}
		})

		collector.on('end', collected => {
			row.components.forEach((button) => {
				button.setDisabled(true);
				interaction.editReply({embeds: [Embeds[page]], components: [row]});
			})
		})
	}
}