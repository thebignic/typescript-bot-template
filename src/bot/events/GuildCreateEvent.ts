import Event from '../struct/Event';
import { Guild } from 'discord.js';

export default abstract class GuildCreateEvent extends Event {
  protected constructor() {
    super({
      name: 'guildCreate',
    });
  }

  async exec(guild: Guild) {
    await this.client.commandRegistry.registerCommandsInGuild(guild);
  }
}
