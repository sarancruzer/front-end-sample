
import Utils from './utils';

describe('Utils', () => {

  describe('parseDate()', () => {
    it('should be defined', () => {
      expect(Utils.parseDate).toBeDefined();
    });

    it('should parse 17-08-2017 15:07:00 to Date', () => {
      const expected = new Date(2017, 7, 17, 15, 7, 0);
      const stringDate = '17-08-2017 15:07:00';
      expect(Utils.parseDate(stringDate).toUTCString()).toEqual(expected.toUTCString());
    });

    it('should parse 17-8-2017 15:7:00 to Date', () => {
      const expected = new Date(2017, 7, 17, 15, 7, 0);
      const stringDate = '17-8-2017 15:7:00';
      expect(Utils.parseDate(stringDate).toUTCString()).toEqual(expected.toUTCString());
    });
  });

});
