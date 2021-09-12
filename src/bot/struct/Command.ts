import { CommandType, CommandOptions } from '../types/Options';
import {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  CommandInteraction,
  PermissionString,
} from 'discord.js';
import Bot from '../client/Client';

abstract class Command implements CommandOptions {
  public name: string;
  public aliases: string[];
  public description: string;
  public usage: string;
  public category: string;
  public cooldown: number;
  public type?: ApplicationCommandType;
  public ownerOnly: boolean;
  public guildOnly: boolean;
  public clientPermissions?: PermissionString[];
  public options?: ApplicationCommandOptionData[];
  public abstract client: Bot;

  protected constructor(options: CommandType) {
    this.name = options.name;
    this.aliases = options.aliases ?? [];
    this.description = options.description;
    this.usage = options.usage ?? '';
    this.category = options.category ?? 'Misc';
    this.cooldown = options.cooldown ?? 0;
    this.ownerOnly = options.ownerOnly ?? false;
    this.guildOnly = options.guildOnly ?? false;
    this.type = options.type;
    this.clientPermissions = options.clientPermissions;
    this.options = options.options;
  }

  public abstract exec(
    interaction: CommandInteraction
  ): unknown | Promise<unknown>;
}

export default Command;
