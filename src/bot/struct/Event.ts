import { EventOptions } from '../types/Options';
import Bot from '../client/Client';
import { Awaited } from 'discord.js';
import { ClientEvent } from '../types/ClientEvent';

abstract class Event {
  public name: ClientEvent;
  public type: 'on' | 'once';
  public once: boolean;
  public abstract client: Bot;

  protected constructor(options: EventOptions) {
    this.name = options.name;
    this.once = options.type === 'once' ?? false;
  }

  public abstract exec(...args: any[]): void | Awaited<void>;
}

export default Event;
