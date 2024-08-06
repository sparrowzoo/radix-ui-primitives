import { Measurable, observeElementRect } from './index';

const mockRect: ClientRect = {
  toJSON(): any {
    return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0
    };
  },
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0
};

// class MockElement implements Measurable {
//   getBoundingClientRect(): ClientRect {
//     return mockRect;
//   }
// }

//const mockElement = new MockElement();

const mockElement2: Measurable = {
  getBoundingClientRect(): ClientRect {
    return mockRect;
  }
};

describe('observe', () => {
  it('should be defined', () => {
    observeElementRect(mockElement2, (rect: ClientRect) => {
      console.log(rect);
      console.log('first callback');
    });

    observeElementRect(mockElement2, (rect: ClientRect) => {
      console.log(rect);
      console.log('second callback');
    });
  });
});
