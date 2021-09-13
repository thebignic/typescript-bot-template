import Event from '../struct/Event';
import { Interaction } from 'discord.js';
import settings from '../settings';

export default abstract class InteractionCreateEvent extends Event {
  protected constructor() {
    super({
      name: 'interactionCreate',
    });
  }

  async exec(interaction: Interaction) {
    if (interaction.isCommand()) {
      await interaction.deferReply({ ephemeral: true });
      const command = this.client.commands.get(interaction.commandName);
      if (command) {
        if (
          command.ownerOnly &&
          !settings.BOT_OWNER_ID.includes(interaction.user.id)
        )
          return interaction.reply({
            content: 'This command can only be used by the owner of the bot.',
            ephemeral: true,
          });
        const clientPermissions = command.clientPermissions;
        const missingPermissions = [];
        if (clientPermissions?.length)
          for (let i: number = 0; i < clientPermissions.length; i++) {
            const hasPermission = interaction.guild?.me?.permissions.has(
              clientPermissions[i]
            );
            if (!hasPermission) missingPermissions.push(clientPermissions[i]);
          }
        if (missingPermissions.length) return interaction.deferReply();

        command.exec(interaction);
      }
    }
  }
}
