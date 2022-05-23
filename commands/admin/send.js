const { ActionRow } = require("@discordjs/builders")
const { Client, CommandInteraction } = require("discord.js")
const { readFileSync, existsSync } = require("fs")
const logger = require("../../handlers/logger")
const { getEmbedFromJSON, getSelectFromJSON } = require(`${process.cwd()}/helpers/getFromJSON.js`)

const options = [
    {
        name: "filename",
        description: "Wähle den Dateinamen ohne Endung.",
        type: "STRING",
        required: true
    },
    {
        name: "clear",
        description: "Cleare den Channel bevor gesendet wird.",
        type: "BOOLEAN",
        required: true
    }
]

module.exports = {

    name: "send",
    description: "Sende einen TEXT, EMBED, SELECT, EXTRA.",
    type: 'CHAT_INPUT',
    userPermissions: ["MANAGE_MESSAGES"],
    rolePermissions: ["814234539773001778"],

    options: [
        {
            name: "text",
            description: "Sende einen normalen Text.",
            type: "SUB_COMMAND",
            options: options
        },
        {
            name: "embed",
            description: "Sende ein EMBED.",
            type: "SUB_COMMAND",
            options: options
        },
        {
            name: "select",
            description: "Sende ein SELECT/Dropdown.",
            type: "SUB_COMMAND",
            options: options
        },
        {
            name: "extra",
            description: "Für spezuelle Dinge.",
            type: "SUB_COMMAND",
            options: options
        },

    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        try {

            const file = args[1]
            if (file === "example") interaction.reply({ content: "⛔	- You cant send an example", ephemeral: true });
            if (args[2] === true) {
                await interaction.channel.bulkDelete(100, true)
            }
            switch (args[0].toLowerCase()) {
                case "text":
                    // if file is a file
                    // if (data.commands.send.infoList.includes(file)) {
                    //     let infoWelcome = readFileSync(`${process.cwd()}/assets/texts/infoWelcome1.txt`, "utf-8")
                    //     let infoWelcome2 = readFileSync(`${process.cwd()}/assets/texts/infoWelcome2.txt`, "utf-8")
                    //     let infoProjects = readFileSync(`${process.cwd()}/assets/texts/infoProjects.txt`, "utf-8")
                    //     let infoChannel = readFileSync(`${process.cwd()}/assets/texts/infoChannels.txt`, "utf-8")
                    //     let infoRoles = readFileSync(`${process.cwd()}/assets/texts/infoRoles1.txt`, "utf-8")
                    //     let infoRoles2 = readFileSync(`${process.cwd()}/assets/texts/infoRoles2.txt`, "utf-8")
                    //     interaction.channel.send(infoWelcome)
                    //     interaction.channel.send(infoWelcome2)
                    //     interaction.channel.send(infoProjects)
                    //     interaction.channel.send(infoChannel)
                    //     interaction.channel.send(infoRoles)
                    //     interaction.channel.send(infoRoles2)
                    // } else {
                    try {
                        if (existsSync(`${process.cwd()}/assets/texts/${file}.txt`)) {
                            let text = readFileSync(`${process.cwd()}/assets/texts/${file}.txt`, "utf-8")
                            interaction.channel.send({ content: text })
                            interaction.reply({ content: "✅	- Text has been sent.", ephemeral: true })
                        } else {
                            interaction.reply({ content: "⛔	- An error occured.", ephemeral: true })
                        }
                    } catch (e) {
                        interaction.reply({ content: "⛔	- An error occured.", ephemeral: true })
                        logger.error(e)
                    }
                    // }
                    break

                case "embed":
                    getEmbedFromJSON(`${process.cwd()}/assets/embeds/${file}.json`).then((embed) => {
                        interaction.channel.send({ embeds: [embed] })
                    })
                    interaction.reply({ content: `✅	- Embed ${"`" + file + "`"} sent`, ephemeral: true })
                    break

                case "select":
                    getSelectFromJSON(`${process.cwd()}/assets/selects/${file}.json`).then((selectData) => {
                        let row = new ActionRow()
                            .addComponents(selectData.select)
                        interaction.channel.send({ content: selectData.message, components: [row] })
                    })
                    interaction.reply({ content: `✅	- Select ${"`" + file + "`"} sent`, ephemeral: true })
                    break

                case "extra":
                    break

                default:
                    break
            }
        } catch (e) {
            interaction.reply({ content: "⛔	- An error occured.", ephemeral: true })
            logger.error(e)
        }
    }
}