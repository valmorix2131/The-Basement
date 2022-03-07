const { Perms } = require("../Validation/Permissions");
const { Client } = require("discord.js");

/**
 * @param {Client} client
 */
 module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Commands Loaded");

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split("/")[7], "<a:cross:949499323559841872> ", "Missing a name.")

        if(!command.context && !command.description)
        return Table.addRow(command.name, "<a:cross:949499323559841872> ", "Missing a description.")

        if(command.permission) {
            if(Perms.includes(command.permission))
            command.defaultPermission = false;
            else
            return Table.addRow(file.split("/")[7], "<a:cross:949499323559841872> ", "Permission is invalid.")
        }

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "✅ SUCCESSFUL");
    });

    console.log(Table.toString());

    // permission check // 

    client.on("ready", async () => {
        const MainGuild = await client.guilds.cache.get("934791425927811092");

        MainGuild.commands.set(CommandsArray).then(async (command) => {
            const Roles = (getCommandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === getCommandName).permission;
                if(!cmdPerms) return null;

                return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms) && !r.managed).first(10);
            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if(!roles) return accumulator;

                const permissions = roles.reduce((a, r) => {
                    return [...a, {id: r.id, type: "ROLE", permission: true}]
                }, []);
                
                return [...accumulator, {id: r.id, permissions}]
            }, []);

            await MainGuild.commands.permissions.set({ fullPermissions });
        });
    });
}