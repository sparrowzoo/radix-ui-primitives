import { composeEventHandlers } from './primitive';

describe('composeEventHandlers', () => {
  it('should merge multiple event handlers into one', () => {
    const originalHandler = () => {
      console.log('original');
    };
    const outerHandler = () => {
      console.log('outer');
    };
    const composedHandler = composeEventHandlers(originalHandler, outerHandler, {
      checkForDefaultPrevented: true,
    });
    expect(composedHandler).toBeInstanceOf(Function);

    function handleEvent<E>(event: E) {
      const event2 = event as Event;
      const eventResult = event2.defaultPrevented;
      console.log(eventResult);
      if (!eventResult) {
        console.log('composed');
      }
    }

    handleEvent(100);

    let A: number = 10;
    //let C: Event = A as Event;
    let B: string = 'hello';
    // A = B as number;
    A = B as unknown as number;
    console.log(A);
    composedHandler({
      defaultPrevented: false,
      bubbles: false,
      target: null,
      type: 'sss',
      currentTarget: null,
      eventPhase: 1111,
      cancelable: true,
      timeStamp: 1111,
      isTrusted: true,
    });
  });
});
