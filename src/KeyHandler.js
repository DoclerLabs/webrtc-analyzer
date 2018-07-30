import eventEmitter from './eventEmitter';
import events from './events';

class KeyHandler {
  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.isCTRLDown = false;
    this.setListener();
  }

  setListener() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown({ keyCode }) {
    if (keyCode === 17) {
      this.isCTRLDown = true;
    }
  }

  handleKeyUp({ keyCode }) {
    if (keyCode === 17) {
      this.isCTRLDown = false;
    } else if (this.isCTRLDown && keyCode === 72) {
      eventEmitter.emit(events.TOGGLE_VISIBILITY);
    }
  }

  destroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }
}

export default KeyHandler;
