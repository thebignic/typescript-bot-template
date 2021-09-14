import Event from '../struct/Event';
import { Collection, Interaction } from 'discord.js';
import settings from '../settings';
import Embed from '../struct/Embed';

export default abstract class InteractionCreateEvent extends Event {
  protected constructor() {
    super({
      name: 'interactionCreate',
    });
  }

  async exec(interaction: Interaction): Promise<void> {
    if (interaction.isCommand()) {
      const command = this.client.commands.get(interaction.commandName);
      if (command) {
        const { ephemeral } = command;
        await interaction.deferReply({ ephemeral });
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
        if (missingPermissions.length)
          return interaction.deferReply({ ephemeral });
        if (command.cooldown) {
          if (!this.client.cooldowns.has(command.name)) {
            this.client.cooldowns.set(command.name, new Collection());
          }
          const now = Date.now();
          const timestamps = this.client.cooldowns.get(command.name);
          const cooldownAmount = command.cooldown * 1000;
          if (timestamps?.has(interaction.user.id)) {
            const cooldown = timestamps.get(interaction.user.id);
            if (cooldown) {
              const expirationTime = cooldown + cooldownAmount;
              if (now < expirationTime)
                return interaction.reply({
                  embeds: [
                    new Embed().setBase(
                      'Command on Cooldown',
                      `You'll be able to use this command again in \`${(
                        (expirationTime - now) /
                        1000
                      ).toFixed(1)}s\`.`
                    ),
                  ],
                  ephemeral,
                });
            }
          }
          timestamps?.set(interaction.user.id, now);
          setTimeout(
            () => timestamps?.delete(interaction.user.id),
            cooldownAmount
          );
        }
        try {
          await interaction.followUp('beamed');
          await command.exec(interaction);
          return;
        } catch {
          await interaction.reply({
            embeds: [
              new Embed().setError(
                'There was an error executing this command.'
              ),
            ],
            ephemeral,
          });
          return;
        }
      }
    }
  }
}
