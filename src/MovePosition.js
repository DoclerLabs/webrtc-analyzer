import eventEmitter from './eventEmitter';
import events from './events';
import { moveSkeleton } from './skeleton';

class MovePosition {
  constructor(options) {
    this._onPositionToggled = this._onPositionToggled.bind(this);
    this.positionsAvailable = ['left', 'right'];
    let posIndex = this.positionsAvailable.indexOf(options.position);
    this.positionIndex = posIndex > -1 ? posIndex : 0;
    this._setListeners();
  }

  _setListeners() {
    eventEmitter.on(events.TOGGLE_POSITION, this._onPositionToggled);
  }

  _onPositionToggled() {
    let oldIndex = this.positionIndex;
    this.positionIndex++;
    if (!this.positionsAvailable[this.positionIndex]) {
      this.positionIndex = 0;
    }
    moveSkeleton(this.positionsAvailable[this.positionIndex], this.positionsAvailable[oldIndex]);
  }

  destroy() {
    eventEmitter.removeListener(events.TOGGLE_POSITION, this._onPositionToggled);
  }
}

export default MovePosition;
