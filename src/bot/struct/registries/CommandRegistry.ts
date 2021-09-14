import Bot from "../../client/Client";
import Command from "../../struct/Command";
import { sync } from "glob";
import { join } from "path";
import { ApplicationCommand, ApplicationCommandData, Guild } from "discord.js";
import settings from "../../settings";

export default class CommandRegistry {
  private readonly client: Bot;

  constructor(client: Bot) {
    this.client = client;
  }

  public async commandRegistry() {
    for (const )
      }

  public async registerCommandsInGuild(guild: Guild) {
    const commandFiles = sync(join(__dirname, "../../commands/**/*"));
    for (const file of commandFiles) {
      if (/\.(j|t)s$/iu.test(file)) {
        const File = require(file).default;
        if (File && File.prototype instanceof Command) {
          const command: Command = new File();
          command.client = this.client;
          const { name, description, type, options } = command;
          const commandData: ApplicationCommandData = {
            name,
            description,
            type,
            options,
            defaultPermission: command.ownerOnly
              ? false
              : command.defaultPermission
          };
          let slashCommand: ApplicationCommand | undefined;
          if (
            !(await guild.commands.fetch()).some(
              guildCommand => command.name === guildCommand.name
            )
          )
            try {
              slashCommand = await guild.commands.create(commandData);
            } catch {
            }
          if (slashCommand)
            await slashCommand.permissions.add({
              permissions: settings.BOT_OWNER_ID.map(id => {
                return {
                  id,
                  type: "USER",
                  permission: true
                };
              })
            });
        }
      }
    }
  }
}
const registerCommands: Function = async (client: Bot) => {
  const commandFiles = sync(join(__dirname, "../../commands/**/*"));
  for (const file of commandFiles) {
    if (/\.(j|t)s$/iu.test(file)) {
      const File = require(file).default;
      if (File && File.prototype instanceof Command) {
        const command: Command = new File();
        command.client = client;
        const { name, description, type, options } = command;
        const commandData: ApplicationCommandData = {
          name,
          description,
          type,
          options,
          defaultPermission: command.ownerOnly
            ? false
            : command.defaultPermission
        };
        let slashCommand: ApplicationCommand | undefined;

        for (const [_id, guild] of client.guilds.cache.entries()) {
          if (
            !(await guild.commands.fetch()).some(
              guildCommand => command.name === guildCommand.name
            )
          )
            try {
              console.log(`creating command ${command.name}`);
              slashCommand = await guild.commands.create(commandData);
            } catch {
            }
        }

        if (slashCommand)
          await slashCommand.permissions.add({
            permissions: settings.BOT_OWNER_ID.map(id => {
              return {
                id,
                type: "USER",
                permission: true
              };
            })
          });

        client.commands.set(command.name, command);
      }
    }
  }
};

// export default registerCommands;
