import getStyle from './Style';

const defaultSkeletonClass = {
  holderClass: 'webrtc-analyzer',
  switcherClass: 'wa-header',
  bodyClass: 'wa-main',
  hiddenClass: 'hidden'
};

function createSkeleton(isVisible, position) {
  const skeletonChildren = `<div class="wa-holder"><header class="${
    defaultSkeletonClass.switcherClass
  }"><header>Select a PeerConnection</header></header><main class="${
    defaultSkeletonClass.bodyClass
  }">${getStyle()}</main></div>`;
  const skeleton = document.createElement('div');
  skeleton.classList.add(defaultSkeletonClass.holderClass);
  if (isVisible === false) {
    skeleton.classList.add(defaultSkeletonClass.hiddenClass);
  }
  skeleton.classList.add(`p-${position}`);
  skeleton.innerHTML = skeletonChildren;
  let body = document.querySelector('body');
  if (body !== null) {
    document.querySelector('body').appendChild(skeleton);
  } else {
    console.error('[WebRTC-Analyzer]: Body not found, the element could not be appended to the dom.');
  }
}

function removeSkeleton() {
  document.querySelector(`.${defaultSkeletonClass.holderClass}`).remove();
}

function hideSkeleton() {
  document.querySelector(`.${defaultSkeletonClass.holderClass}`).classList.add('hidden');
}

function showSkeleton() {
  document.querySelector(`.${defaultSkeletonClass.holderClass}`).classList.remove('hidden');
}

function moveSkeleton(newPosition, oldPosition) {
  let holder = document.querySelector(`.${defaultSkeletonClass.holderClass}`);
  if (holder !== null) {
    document.querySelector(`.${defaultSkeletonClass.holderClass}`).classList.remove(`p-${oldPosition}`);
    document.querySelector(`.${defaultSkeletonClass.holderClass}`).classList.add(`p-${newPosition}`);
  }
}

export { defaultSkeletonClass, createSkeleton, removeSkeleton, hideSkeleton, showSkeleton, moveSkeleton };
