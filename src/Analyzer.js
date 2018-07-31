import Logic from './Logic';
import Element from './Element';
import Navigation from './Navigation';
import KeyHandler from './KeyHandler';
import MovePosition from './MovePosition';
import eventEmitter from './eventEmitter';
import events from './events';

class Analyzer {
  constructor(settings) {
    this.elements = [];
    let defaults = {
      interval: 3000,
      isVisible: true,
      position: 'right'
    };
    this.options = { ...defaults, ...settings };
    if (typeof this.options.interval !== 'number') {
      throw new Error('[WebRTC-Analyzer]: interval has to be a number.');
    }

    if ((this.options.isVisible === true || this.options.isVisible === false) === false) {
      throw new Error('[WebRTC-Analyzer]: isVisible has to be a boolean (true or false).');
    }

    if (this.options.position !== 'left' && this.options.position !== 'right') {
      throw new Error('[WebRTC-Analyzer]: not available position (supported: left, right).');
    }

    this.logic = new Logic(this.options);
    this.navigation = new Navigation();
    this.keyhandler = new KeyHandler();
    this.movePosition = new MovePosition(this.options);
  }

  addPeerConnection(peerConnection) {
    let element = new Element(peerConnection);
    this.elements.push(element);
    eventEmitter.emit(events.NEW_ELEMENT, element.id);
    return element.id;
  }

  removePeerConnection(peerConnectionId) {
    this.elements = this.elements.filter(function(element) {
      let isRemovable = element.id !== peerConnectionId;
      if (isRemovable === true) {
        element.destroy();
        eventEmitter.emit(events.REMOVE_ELEMENT, element.id);
      }
      return isRemovable;
    });
  }

  _removeAll() {
    this.elements.forEach(element => {
      element.destroy();
    });
    this.elements = [];
  }

  destroy() {
    this._removeAll();
    this.keyhandler.destroy();
    this.navigation.destroy();
    this.logic.destroy();
    this.movePosition.destroy();
    eventEmitter.removeAllListeners();
  }
}
export default Analyzer;
