const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Help command',
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async execute(interaction, client) {
		const help = new MessageEmbed()
			.setTitle('<:generalChat:934476109989425252> The Basement Help Menu')
			.setColor('YELLOW')
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
			.setDescription('To see all my commands press the buttons below | Coded by : Leunel#6680')
			.setFields(
				{
					name: 'Info',
					value: `\`6 Information Commands\``,
					inline: true
				}, {
				name: 'Utility',
				value: `\`6 Utility Commands\``,
				inline: true
			}, {
				name: 'Moderation',
				value: `\`6 Moderation Commands\``,
				inline: true
			}, {
				name: 'Music',
				value: `\`14 Music Commands\``,
				inline: true
			})
		const embed1 = new MessageEmbed()
			.setTitle('Information Commands')
			.setDescription(`\`advice\`, \`help\`, \`animesearch\`, \`cat\`, \`dog\`, \`userinfo\``)
			.setColor('2e3137')
			.setTimestamp()

		const embed2 = new MessageEmbed()
			.setColor('2e3137')
			.setTitle('Utility Commands')
			.setDescription(`\`afkset\`, \`vc configure\`, \`vc add\`, \`vc public\`, \`vc hide\`, \`vc remove\``)
			.setTimestamp()

		const embed3 = new MessageEmbed()
			.setColor('2e3137')
			.setTitle('Moderation Commands')
			.setDescription(`\`ban\`, \`clear\`, \`kick\`, \`lockdown\`, \`slowmode\`, \`unban\`, \`timeout\``)
			.setTimestamp()

		const embed4 = new MessageEmbed()
			.setColor('2e3137')
			.setTitle('Music Commands')
			.setDescription(`\`play\`, \`skip\`, \`pause\`, \`resume\`, \`volume\`, \`shuffle\`, \`queue\`, \`relatedsong\`, \`seek\`, \`previous\`, \`loop\`, \`filters\`, \`disconnect\`, \`autoplay\``)
			.setTimestamp()


		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('935072188233547806')
					.setCustomId('info'),

				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('935089387040022579')
					.setCustomId('utility'),

				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('moderation:935075898862993439')
					.setCustomId('moderation'),
				new MessageButton()
					.setStyle('SECONDARY')
					.setCustomId('music')
					.setEmoji('935073407387725924'),


			)

		const row2 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('SECONDARY')
					.setCustomId('music')
					.setEmoji('935073407387725924')
			)

            const row3 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setEmoji('930143460277751808')
					.setURL('https://www.youtube.com/watch?v=V-_O7nl0Ii0')
					.setLabel('Dont click me :)')
			)

		const row4 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('935072188233547806')
					.setCustomId('info'),

				new MessageButton()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('935089387040022579')
					.setCustomId('utility'),

				new MessageButton()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('moderation:935075898862993439')
					.setCustomId('moderation'),
				new MessageButton()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('935072188233547806')
					.setCustomId('music'))

                    

		const msg = interaction.reply({ embeds: [help], components: [row, row3] })

		const collector = interaction.channel.createMessageComponentCollector({
			time: 1000 * 60
		});

		collector.on('collect', async interaction => {
			if (interaction.customId === 'info') {
				await interaction.reply({ embeds: [embed1], components: [row3], ephemeral: true })
			} else if (interaction.customId === 'utility') {
				await interaction.reply({ embeds: [embed2], components: [row3], ephemeral: true })
			} else if (interaction.customId === 'moderation') {
				await interaction.reply({ embeds: [embed3], components: [row3], ephemeral: true })
			} else if (interaction.customId === 'music') {
				await interaction.reply({ embeds: [embed4], components: [row3], ephemeral: true })
			}
		})

		collector.on('end', async () => {
			interaction.editReply({
				embeds: [help],
				components: [row2, row4]
			})
		})
	}
}