import { clamp } from './number';

describe('clamp', () => {
  it('should return the value if it is within the range', () => {
    expect(clamp(5, [0, 10])).toBe(5);
    expect(clamp(11, [0, 10])).toBe(10);
  });
});
