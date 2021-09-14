import Event from "../struct/Event";
import { Guild } from "discord.js";
import { sync } from "glob";
import { join } from "path";
import Command from "../struct/Command";

export default abstract class GuildCreateEvent extends Event {
  protected constructor() {
    super({
      name: "guildCreate",
      type: "on"
    });
  }

  async exec(guild: Guild) {
    const commandFiles = sync(join(__dirname, "../../commands/**/*"));
    for (const file of commandFiles) {
      if (/\.(j|t)s$/iu.test(file)) {
        const File = require(file).default;
        if (File && File.prototype instanceof Command) {
          const command: Command = new File();
          command.client = client;

        }
      }
    }
