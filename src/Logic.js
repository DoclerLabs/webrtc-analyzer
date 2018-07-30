import { createSkeleton, showSkeleton, hideSkeleton, removeSkeleton } from './skeleton';
import eventEmitter from './eventEmitter';
import events from './events';
import Element from './Element';
import Navigation from './Navigation';

class Logic {
  constructor(options) {
    createSkeleton();
    this.isVisible = options.isVisible;
    this.interval = options.interval;
    this.activeId;
    this.intervalFn;
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
    this._onToggleVisibility = this._onToggleVisibility.bind(this);
    this._setListeners();
    if (this.isVisible) {
      this._onVisible();
    }
  }

  _setListeners() {
    eventEmitter.on(events.CHANGE_VISIBILITY, this._onVisibilityChange);
    eventEmitter.on(events.TOGGLE_VISIBILITY, this._onToggleVisibility);
  }

  _onVisibilityChange(id) {
    this.activeId = id;
  }

  _onToggleVisibility() {
    this.isVisible = !this.isVisible;
    if (this.isVisible === false) {
      this._onHidden();
    } else {
      this._onVisible();
    }
  }

  _onHidden() {
    hideSkeleton();
    clearInterval(this.intervalFn);
  }

  _onVisible() {
    showSkeleton();
    this.startReRenderingProcess();
  }

  startReRenderingProcess() {
    this.intervalFn = setInterval(() => {
      eventEmitter.emit(events.CHANGE_VISIBILITY, this.activeId);
    }, this.interval);
  }

  destroy() {
    removeSkeleton();
    clearInterval(this.intervalFn);
  }
}

export default Logic;
