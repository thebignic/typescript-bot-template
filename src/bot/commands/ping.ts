import Command from '../struct/Command';
import { CommandInteraction } from 'discord.js';

abstract class PingCommand extends Command {
  protected constructor() {
    super({
      name: 'pinganother',
      aliases: ['p'],
      description: 'Pong!',
    });
  }

  async exec(interaction: CommandInteraction) {
    return interaction.reply('Pong!');
  }
}

export default PingCommand;
