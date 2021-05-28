import {dateToTs, formatDate, tsToDate} from '@util/date-util';

const TestDate = new Date(Date.UTC(2021, 0, 1, 10, 30, 0));
const TestTimestampSeconds = 1609497000; // Same as TestDate, used https://www.unixtimestamp.com/
const TestTimestampMilliseconds = 1609497000000; // Same as TestDate, used https://www.unixtimestamp.com

describe('date-util', () => {
  describe('dateToTs', () => {
    it('should convert a Date object to a UNIX timestamp in seconds', () => {
      const result = dateToTs(TestDate);
      expect(result).toStrictEqual(TestTimestampSeconds);
    });

    it('should convert a Date object to a UNIX timestamp in milliseconds', () => {
      const result = dateToTs(TestDate, true);
      expect(result).toStrictEqual(TestTimestampMilliseconds);
    });
  });

  describe('tsToDate', () => {
    it('should convert a UNIX timestamp in seconds to a Date object', () => {
      const result = tsToDate(TestTimestampSeconds);
      expect(result).toStrictEqual(TestDate);
    });

    it('should convert a UNIX timestamp in milliseconds to a Date object', () => {
      const result = tsToDate(TestTimestampMilliseconds, true);
      expect(result).toStrictEqual(TestDate);
    });
  });

  describe('formatDate', () => {
    it('should format a Date object using the en-US locale', () => {
      const result = formatDate(TestDate);
      expect(result).toMatch(
        /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{2}),\s(\d{1,2}):(\d{1,2})\s(AM|PM)$/,
      );
    });
  });
});
