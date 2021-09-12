import {
  PermissionString,
  CommandInteraction,
  ApplicationCommandType,
  ApplicationCommandOptionData,
} from 'discord.js';
import { ClientEvent } from './ClientEvent';

export interface CommandOptions {
  name: string;
  aliases?: string[];
  description: string;
  usage?: string;
  category?: string;
  cooldown?: number;
  ownerOnly?: boolean;
  guildOnly?: boolean;
  defaultPermission?: boolean;
  type?: ApplicationCommandType;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
  options?: ApplicationCommandOptionData[];
  exec: (interaction: CommandInteraction) => unknown | Promise<unknown>;
}

export type CommandType = Omit<CommandOptions, 'exec'>;

export interface EventOptions {
  name: ClientEvent;
  type?: 'on' | 'once';
}
