import Event from '../struct/Event';

abstract class ReadyEvent extends Event {
  protected constructor() {
    super({
      name: 'ready',
      type: 'once',
    });
  }

  async exec() {
    console.log('Ready!');
  }
}

export default ReadyEvent;
