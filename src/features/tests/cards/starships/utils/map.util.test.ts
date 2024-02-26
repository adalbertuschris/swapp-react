import { describe, it, expect } from "vitest";
import { mapStarship } from "../../../../cards/starships/utils/map.util";
import { StarshipDetailResult } from "../../../../../api/starships/models/starship-detail-result";

describe("mapStarship", () => {
  it("return null if model is null or undefined", () => {
    expect(mapStarship(null)).toBe(null);
    expect(mapStarship(undefined)).toBe(null);
  });

  it("map StarshipDetailResult without any common attribute to Card", () => {
    const model = {
      name: "Death Star",
    } as StarshipDetailResult;

    const expectedModel = {
      title: "Death Star",
      subtitle: undefined,
      properties: {
        crew: {
          translationKey: "cards.starships.crew",
          value: undefined,
          rawValue: undefined,
        },
        starshipClass: {
          translationKey: "cards.starships.starshipClass",
          value: undefined,
          rawValue: undefined,
        },
        length: {
          translationKey: "cards.starships.length",
          value: undefined,
          rawValue: undefined,
        },
      },
    };

    expect(mapStarship(model)).toEqual(expectedModel);
  });

  it("map StarshipDetailResult with all common attributes to Card", () => {
    const model = {
      model: "DS-1 Orbital Battle Station",
      starshipClass: "Deep Space Mobile Battlestation",
      crew: "342,953",
      length: "120000",
      name: "Death Star",
    } as StarshipDetailResult;

    const expectedModel = {
      title: "Death Star",
      subtitle: "DS-1 Orbital Battle Station",
      properties: {
        crew: {
          translationKey: "cards.starships.crew",
          value: "342,953",
          rawValue: "342,953",
        },
        starshipClass: {
          translationKey: "cards.starships.starshipClass",
          value: "Deep Space Mobile Battlestation",
          rawValue: "Deep Space Mobile Battlestation",
        },
        length: {
          translationKey: "cards.starships.length",
          value: "120000",
          rawValue: "120000",
        },
      },
    };

    expect(mapStarship(model)).toEqual(expectedModel);
  });
});
