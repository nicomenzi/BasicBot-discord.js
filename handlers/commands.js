const { glob } = require("glob")
const { promisify } = require("util")
const globPromise = promisify(glob)

const { Client } = require("discord.js")
const data = require(`${process.cwd()}/properties.json`)

/**
 * 
 * @param { Client } client 
 */

// Register all SlashCOmmands declared in ../commands
module.exports = async (client) => {
    const slashCommands = await globPromise(
        `${process.cwd()}/commands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        // -- Register for a single guild
        const guild = client.guilds.cache.get(data.guildId)
        await guild.commands.set(arrayOfSlashCommands)


        // In a older version of the bot, you can register permissions for a guild
        // 
        // 
        // .then((cmd) => {
        //     const getRoles = (commandName) => {
        //         const permissions = arrayOfSlashCommands.find(x => x.name === commandName).userPermissions;

        //         if (!permissions) return null;

        //         return guild.roles.cache.filter(
        //             (x) => x.permissions.has(permissions) && !x.managed
        //         );
        //     };

        //     const fullPermissions = cmd.reduce((accumulator, x) => {
        //         const roles = getRoles(x.name)
        //         if (!roles) return accumulator;

        //         const permissions = roles.reduce((a, v) => {
        //             return [
        //                 ...a,
        //                 {
        //                     id: v.id,
        //                     type: 'ROLE',
        //                     permission: true
        //                 }
        //             ];
        //         }, []);
        //         return [
        //             ...accumulator,
        //             {
        //                 id: x.id,
        //                 permissions,
        //             }
        //         ]
        //     }, [])
        //     guild.commands.permissions.set({ fullPermissions })
        // });
    });
}