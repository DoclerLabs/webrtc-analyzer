import MovePosition from '../src/MovePosition';
import eventEmitter from '../src/eventEmitter';
import events from '../src/events';

describe('Move position', () => {
  var movePosition;

  afterEach(() => {
    movePosition.destroy();
  });

  test('Test if position is left then positionIndex is 0.', () => {
    movePosition = new MovePosition({
      position: 'left'
    });
    expect(movePosition.positionIndex).toBe(0);
  });

  test('Test if position is right then positionIndex is 1.', () => {
    movePosition = new MovePosition({
      position: 'right'
    });
    expect(movePosition.positionIndex).toBe(1);
  });
});
