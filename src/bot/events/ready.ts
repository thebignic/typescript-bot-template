import Event from '../struct/Event';
import { CommandRegistry } from '../struct/registries/export/RegistryIndex';

abstract class ReadyEvent extends Event {
  protected constructor() {
    super({
      name: 'ready',
      type: 'once',
    });
  }

  async exec() {
    console.log('Ready!');
    CommandRegistry(this.client);
  }
}

export default ReadyEvent;
