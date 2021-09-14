import { MessageEmbed, User } from 'discord.js';

type StringResolvable = any;

export default class Embed extends MessageEmbed {
  readonly baseFooter;

  constructor() {
    super();
    this.baseFooter = `Maven`;
    this.setTimestamp();
    this.setFooter(this.baseFooter);
    this.setColor('#2F3136');
  }

  public setCommandEmbed(user: User) {
    this.setFooter(`${user.tag}`, user.displayAvatarURL({ dynamic: true }));
    return this;
  }

  public addToFooter(footer: StringResolvable) {
    this.setFooter(`${footer} | ${this.baseFooter}`);
    return this;
  }

  public removeFooter() {
    this.setFooter('');
    return this;
  }

  public setBase(
    author: StringResolvable,
    description: StringResolvable,
    authorUrl?: string
  ) {
    this.setAuthor(author.toString(), authorUrl ?? '');
    this.setDescription(description.toString());
    return this;
  }

  public setSuccess(description: StringResolvable) {
    this.setBase(
      'Successful',
      description.toString(),
      'https://cdn.discordapp.com/attachments/713140948825014402/717101156332994622/settingsmaven.png'
    );
    return this;
  }

  public setError(description: StringResolvable) {
    this.setBase('RED', 'Error', description.toString());
    return this;
  }

  public setWarning(description: StringResolvable) {
    this.setBase(
      'Warning',
      description.toString(),
      'https://cdn.discordapp.com/emojis/870494248418562048.png?v=1'
    );
    return this;
  }
}
