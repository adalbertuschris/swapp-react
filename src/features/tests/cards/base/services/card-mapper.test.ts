import { describe, it, expect, vi } from "vitest";
import { mapCardResponses } from "../../../../cards/base/services/card-mapper";
import { Card } from "../../../../cards/base/models/card";

describe("mapCardResponses", () => {
  it("return null if data is not set (undefined, null, empty array)", () => {
    expect(mapCardResponses(undefined, null, null)).toBe(null);
    expect(mapCardResponses(null, null, null)).toBe(null);
    expect(
      mapCardResponses(
        [] as unknown as [Record<string, unknown>, Record<string, unknown>],
        null,
        null
      )
    ).toBe(null);
  });

  it("return null if data is array with one item", () => {
    expect(
      mapCardResponses(
        [{ name: "test" }] as unknown as [
          Record<string, unknown>,
          Record<string, unknown>
        ],
        null,
        null
      )
    ).toBe(null);
  });

  it("return null if data items are null", () => {
    expect(
      mapCardResponses(
        [null, null] as unknown as [
          Record<string, unknown>,
          Record<string, unknown>
        ],
        null,
        null
      )
    ).toBe(null);
  });

  describe("mapped results", () => {
    const card: Card = {
      title: "test title",
      subtitle: "test subtitle",
      properties: {
        name: {
          translationKey: "name",
          value: "Tom",
          rawValue: "Tom",
        },
      },
    };

    const map = vi
      .fn()
      .mockReturnValueOnce({ ...card })
      .mockReturnValue({ ...card });

    it("return proper mapped result", () => {
      const compare = vi.fn().mockReturnValue(-1);

      const expectedResult = {
        player1: {
          card,
          win: false,
        },
        player2: {
          card,
          win: true,
        },
      };

      const card1 = { ...card };
      const card2 = { ...card };

      const result = mapCardResponses([card1, card2], compare, map);

      expect(result).toEqual(expectedResult);
      expect(result.player1.card).not.toBe(card1);
      expect(result.player2.card).not.toBe(card2);
      expect(result.player1.card).not.toBe(result.player2.card);
    });

    it("return model with player1.win = true when compare return 0 or 1", () => {
      const cards: [Card, Card] = [{ ...card }, { ...card }];
      expect(
        mapCardResponses(cards, vi.fn().mockReturnValue(-1), map).player1.win
      ).toBe(false);
      expect(
        mapCardResponses(cards, vi.fn().mockReturnValue(0), map).player1.win
      ).toBe(true);
      expect(
        mapCardResponses(cards, vi.fn().mockReturnValue(1), map).player1.win
      ).toBe(true);
    });

    it("return model with player2.win = true when compare return -1 or 0", () => {
      const cards: [Card, Card] = [{ ...card }, { ...card }];
      const compare = vi.fn().mockReturnValue(-1);
      console.log(compare(null));

      expect(
        mapCardResponses(cards, vi.fn().mockReturnValue(-1), map).player2.win
      ).toBe(true);
      expect(
        mapCardResponses(cards, vi.fn().mockReturnValue(0), map).player2.win
      ).toBe(true);
      expect(
        mapCardResponses(cards, vi.fn().mockReturnValue(1), map).player2.win
      ).toBe(false);
    });
  });
});
