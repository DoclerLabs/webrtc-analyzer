import eventEmitter from './eventEmitter';
import events from './events';
import { defaultSkeletonClass } from './skeleton';

class Navigation {
  constructor() {
    this.elements = {};

    this._onRemoveElement = this._onRemoveElement.bind(this);
    this._onNewElement = this._onNewElement.bind(this);
    this._setListener();
  }

  _setListener() {
    eventEmitter.on(events.NEW_ELEMENT, this._onNewElement);
    eventEmitter.on(events.REMOVE_ELEMENT, this._onRemoveElement);
  }

  _onRemoveElement(id) {
    delete this.elements[id];
    this._render();
  }

  _onNewElement(id) {
    let isVisible = Object.keys(this.elements).length > 0;
    eventEmitter.emit(events.CHANGE_VISIBILITY, id);
    this.elements[id] = isVisible;
    this._render();
  }

  _removeListener() {
    eventEmitter.removeListener(events.NEW_ELEMENT, this._onNewElement);
    eventEmitter.removeListener(events.REMOVE_ELEMENT, this._onRemoveElement);
  }

  _onChange(event) {
    let id = event.target.value;
    eventEmitter.emit(events.CHANGE_VISIBILITY, id);
    for (let id in this.elements) {
      this.elements[id] = this.elements[id] === id;
    }
  }

  _render() {
    let select = document.createElement('select');
    let key = 1;
    for (let id in this.elements) {
      let option = document.createElement('option');
      option.value = id;

      if (this.elements[id] === true) {
        option.value = id;
      }
      option.innerText = 'RTCPeerConnection - ' + id;
      select.appendChild(option);
    }

    select.addEventListener('change', this._onChange);
    this._removeFromDOM();
    this._addToDOM(select);
  }

  _addToDOM(element) {
    document
      .querySelector(`.${defaultSkeletonClass.holderClass} .${defaultSkeletonClass.switcherClass}`)
      .appendChild(element);
  }

  _removeFromDOM() {
    let navigationElement = document.querySelector(
      `.${defaultSkeletonClass.holderClass} .${defaultSkeletonClass.switcherClass}`
    );
    let select = navigationElement.querySelector('select');
    if (select !== null) {
      select.removeEventListener('change', this._onChange);
      select.remove();
    }
  }

  destroy() {
    this._removeListener();
  }
}

export default Navigation;
