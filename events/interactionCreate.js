const client = require('../index.js')


client.on('interactionCreate', async interaction => {
	// DONT CHANGE THIS CODE
	// It calls the right SlashCommand run function.
	if (interaction.isCommand) {
		// await interaction.deferReply({ ephemeral: false }).catch(() => { });

		const cmd = client.slashCommands.get(interaction.commandName);
		if (!cmd)
			return interaction.followUp({ content: "An error has occured " });

		const args = [];

		for (let option of interaction.options.data) {
			if (option.type === "SUB_COMMAND") {
				if (option.name) args.push(option.name);
				option.options?.forEach((x) => {
					if (x.value) args.push(x.value);
				});
			} else if (option.value) args.push(option.value);
		}
		interaction.member = interaction.guild.members.cache.get(interaction.user.id);

		cmd.run(client, interaction, args);
	}


	// --> Here you can go on.

	if (interaction.isSelectMenu()) {
		try {
			switch (interaction.customId) {
				case "ranks":
					interaction.component.options.map(role => {
						let removerole = interaction.guild.roles.cache.get(role.value);
						// remove role from member
						interaction.member.roles.remove(removerole)
					})
					interaction.values.map(option => {
						let addrole = interaction.guild.roles.cache.get(option);
						// add role to member
						interaction.member.roles.add(addrole);
					})
					interaction.reply({ content: "Roles updated", ephemeral: true });
					break

				default:
					interaction.reply({ content: "I cant find running code for this interaction.", ephemeral: true });
					logger.info("I dont know what to do. Something missing?");
			}
		} catch (e) {
			interaction.reply({ content: "An error has occured", ephemeral: true });
			logger.error(e);
		}
	}
});