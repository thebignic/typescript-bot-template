import Command from '../struct/Command';
import { CommandInteraction } from 'discord.js';

abstract class PingCommand extends Command {
  protected constructor() {
    super({
      name: 'ping',
      aliases: ['p'],
      description: 'Pong!',
      defaultPermission: true,
    });
  }

  async exec(interaction: CommandInteraction) {
    return interaction.reply('Pong!');
  }
}

export default PingCommand;
