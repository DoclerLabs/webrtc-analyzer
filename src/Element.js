import { generateRandom, replaceStatID } from './utils';
import { defaultSkeletonClass } from './skeleton';
import events from './events';
import eventEmitter from './eventEmitter';

class Element {
  constructor(peerConnection) {
    this.id = generateRandom(10, false, true, false);
    this.peerConnection = peerConnection;
    this.scrollTopPosition = 0;
    this.isVisible = false;
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
    this._setListeners();
  }

  _setListeners() {
    eventEmitter.on(events.CHANGE_VISIBILITY, this._onVisibilityChange);
  }

  _onVisibilityChange(id) {
    let newVisibility = this.id === id;
    if (newVisibility === true) {
      if (this.isVisible === true) {
        this._rememberScrollTop();
        this._removeFromDOM();
      }
      this._render().then(() => {
        this._setScrollTop();
      });
    } else {
      this.scrollTopPosition = 0;
      this._removeFromDOM();
    }

    this.isVisible = newVisibility;
  }

  _rememberScrollTop() {
    let domElement = this._getElementFromDOM();
    if (domElement !== null) {
      this.scrollTopPosition = this._getElementFromDOM().scrollTop;
    }
  }

  _setScrollTop() {
    this._getElementFromDOM().scrollTop = this.scrollTopPosition;
  }

  _getStats() {
    return this.peerConnection.getStats();
  }

  _generateHeader(headerTitle) {
    return `<header>${headerTitle}</header>`;
  }

  _generateFromPCState(title, key) {
    return `<tr><td>${title}</td><td>${this.peerConnection[key]}</td></tr>`;
  }

  _generateFromObject(object) {
    let str = '';
    Object.keys(object).forEach(key => {
      str += `<tr><td>${key}</td><td>${object[key]}</td></tr>`;
    });
    return str;
  }

  _render() {
    return new Promise((resolve, reject) => {
      this._getStats().then(stats => {
        let waStat = document.createElement('div');
        waStat.classList.add('wa-stat');
        waStat.id = this.id;
        let str = `<div class="box"><main>`;
        stats.forEach(stat => {
          str += this._generateHeader(replaceStatID(stat.type));
          str += `<table>`;
          str += this._generateFromObject(stat);
          str += `</table>`;
        });
        str += this._generateHeader('PeerConnection states');
        str += `<table>`;
        str += this._generateFromPCState('Signaling state', 'signalingState');
        str += this._generateFromPCState('ICE gathering state', 'iceGatheringState');
        str += this._generateFromPCState('ICE Connection state', 'iceConnectionState');
        str += this._generateFromPCState('Connection state', 'connectionState');
        str += `</table>`;
        str += '</main></div>';
        waStat.innerHTML = str;
        this._addToDOM(waStat);
        resolve();
      }, reject);
    });
  }

  _getElementFromDOM() {
    return document.querySelector(`.${defaultSkeletonClass.holderClass} #${this.id}`);
  }
  _addToDOM(element) {
    document
      .querySelector(`.${defaultSkeletonClass.holderClass} .${defaultSkeletonClass.bodyClass}`)
      .appendChild(element);
  }

  _removeFromDOM() {
    let element = this._getElementFromDOM();
    if (element !== null) {
      this._getElementFromDOM().remove();
    }
  }

  destroy() {
    eventEmitter.removeListener(events.CHANGE_VISIBILITY, this._onVisibilityChange);
    this._removeFromDOM();
  }
}

export default Element;
