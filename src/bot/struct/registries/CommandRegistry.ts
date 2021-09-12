import Bot from '../../client/Client';
import Command from '../../struct/Command';
import { sync } from 'glob';
import { resolve } from 'path';

const registerCommands: Function = async (client: Bot) => {
  const commandFiles = sync(resolve('src/bot/commands/**/*'));
  for (const file of commandFiles) {
    if (/\.(j|t)s$/iu.test(file)) {
      const File = require(file).default;
      if (File && File.prototype instanceof Command) {
        const command: Command = new File();
        command.client = client;
        const { name, description, type, options } = command;
        const commandData = {
          name,
          description,
          type,
          options,
          defaultPermission: true,
        };
        if (!command.guildOnly)
          await client.application?.commands.create(commandData);
        else
          for (const [_id, guild] of client.guilds.cache.entries()) {
            if (
              !(await guild.commands.fetch()).some(
                guildCommand => command.name === guildCommand.name
              )
            ) {
              try {
                await guild.commands.create(commandData);
              } catch {}
            }
          }
        client.commands.set(command.name, command);
      }
    }
  }
};
export default registerCommands;
