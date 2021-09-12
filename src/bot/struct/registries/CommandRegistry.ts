import Bot from '../../client/Client';
import Command from '../../struct/Command';
import { sync } from 'glob';
import { resolve } from 'path';
import { Guild } from 'discord.js';

const registerCommands: Function = async (client: Bot) => {
  await client.application?.commands.set([]);
  const commandFiles = sync(resolve('src/bot/commands/**/*'));
  for (const file of commandFiles) {
    if (/\.(j|t)s$/iu.test(file)) {
      const File = require(file).default;
      if (File && File.prototype instanceof Command) {
        const command: Command = new File();
        command.client = client;
        client.commands.set(command.name, command);

        client.guilds.cache.each(async (guild: Guild) => {
          console.log(`registering command ${command.name} in ${guild.name}`);
          const { name, description, type, options } = command;
          await guild.commands.create({
            name,
            description,
            type,
            options,
            defaultPermission: true,
          });
        });
      }
    }
  }
};
export default registerCommands;
