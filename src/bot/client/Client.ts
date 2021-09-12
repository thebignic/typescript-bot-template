import { ApplicationCommand, Client, Collection, Intents } from 'discord.js';
import {
  CommandRegistry,
  EventRegistry,
} from '../struct/registries/export/RegistryIndex';
import { EventOptions } from '../types/Options';
import settings from '../settings';
import Command from '../struct/Command';

class Bot extends Client {
  public prefix: string;

  public commands = new Collection<string, Command>();

  public slashCommands = new Collection<string, ApplicationCommand>();

  public cooldowns = new Collection<string, Collection<string, number>>();

  public events = new Collection<string, EventOptions>();

  public constructor() {
    super({
      /* Discord JS Client Options */
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    this.prefix = settings.PREFIX;
  }

  public async start() {
    await super.login(settings.BOT_TOKEN);
    CommandRegistry(this);
    EventRegistry(this);
  }
}

export default Bot;
