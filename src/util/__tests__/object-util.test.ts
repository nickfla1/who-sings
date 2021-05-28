import {maxWithProperty} from '@util/object-util';

describe('object-util', () => {
  describe('maxWithProperty', () => {
    it('should return the object with the highest value', () => {
      const arr: Array<Record<string, any>> = [
        {a: 'aaa', b: 0},
        {a: 'bbb', b: 12},
        {a: 'ccc', b: 8},
      ];

      const result = maxWithProperty(arr, 'b');
      expect(result).toEqual({a: 'bbb', b: 12});
    });
  });
});
