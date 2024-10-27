import { Item, solution } from "./solution";

describe('solution', () => {
  test('should merge overlapping intervals', () => {
      const unavailableItems = [
          { startPx: 10, endPx: 30 },
          { startPx: 55, endPx: 65 },
          { startPx: 35, endPx: 50 },
          { startPx: 20, endPx: 40 },
          { startPx: 60, endPx: 70 },
      ];

      const result = solution(unavailableItems);

      expect(result).toEqual([
          { startPx: 10, endPx: 50 },
          { startPx: 55, endPx: 70 },
      ]);
  });

  test('should merge overlapping intervals with less items', () => {
      const unavailableItems = [
          { startPx: 10, endPx: 30 },
          { startPx: 20, endPx: 40 },
      ];

      const result = solution(unavailableItems);

      expect(result).toEqual([
          { startPx: 10, endPx: 40 },
      ]);
  });

  it('should return the same interval when there is no overlap', () => {
      const unavailableItems = [
          { startPx: 10, endPx: 20 },
          { startPx: 30, endPx: 40 },
          { startPx: 50, endPx: 60 },
      ];

      const result = solution(unavailableItems);

      expect(result).toEqual([
          { startPx: 10, endPx: 20 },
          { startPx: 30, endPx: 40 },
          { startPx: 50, endPx: 60 },
      ]);
  });

  it('should handle adjacent intervals as non-overlapping', () => {
      const unavailableItems = [
          { startPx: 10, endPx: 20 },
          { startPx: 20, endPx: 30 },
      ];

      const result = solution(unavailableItems);

      expect(result).toEqual([
          { startPx: 10, endPx: 30 },
      ]);
  });

  it('should handle a single interval', () => {
      const unavailableItems = [
          { startPx: 10, endPx: 20 },
      ];

      const result = solution(unavailableItems);

      expect(result).toEqual([
          { startPx: 10, endPx: 20 },
      ]);
  });

  it('should handle empty array', () => {
      const unavailableItems: Item[] = [];

      const result = solution(unavailableItems);

      expect(result).toEqual([]);
  });
});