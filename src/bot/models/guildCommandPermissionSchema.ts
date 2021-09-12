/*import { Schema, model } from 'mongoose';
import { Snowflake } from 'discord.js';

export const guildCommandPermissionSchema = model<{
  guildId: Snowflake;
  commandName: string;

  permissions: {
    id: Snowflake;
    hasPermission: boolean;
  };
}>(
  'guild-commands',
  new Schema({
    guildId: { type: String, required: true },
    commandName: { type: String, required: true },
    permissions: { type: Object, required: true },
  })
);

 */
