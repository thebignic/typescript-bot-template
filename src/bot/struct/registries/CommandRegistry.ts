import Bot from '../../client/Client';
import Command from '../../struct/Command';
import { sync } from 'glob';
import { resolve } from 'path';
import { ApplicationCommand, ApplicationCommandData } from 'discord.js';
import settings from '../../settings';

const registerCommands: Function = async (client: Bot) => {
  const commandFiles = sync(resolve('src/bot/commands/**/*'));
  for (const file of commandFiles) {
    if (/\.(j|t)s$/iu.test(file)) {
      const File = require(file).default;
      if (File && File.prototype instanceof Command) {
        const command: Command = new File();
        command.client = client;
        const { name, description, type, options, defaultPermission } = command;
        const commandData: ApplicationCommandData = {
          name,
          description,
          type,
          options,
          defaultPermission: command.ownerOnly ? false : defaultPermission,
        };
        let slashCommand: ApplicationCommand | undefined;
        if (!command.guildOnly)
          slashCommand = await client.application?.commands.create(commandData);
        else
          for (const [_id, guild] of client.guilds.cache.entries()) {
            if (
              !(await guild.commands.fetch()).some(
                guildCommand => command.name === guildCommand.name
              )
            ) {
              try {
                slashCommand = await guild.commands.create(commandData);
              } catch {}
            }
          }
        if (slashCommand)
          await slashCommand.permissions.add({
            permissions: settings.BOT_OWNER_ID.map(id => {
              return {
                id,
                type: 'USER',
                permission: true,
              };
            }),
          });

        client.commands.set(command.name, command);
      }
    }
  }
};
export default registerCommands;
