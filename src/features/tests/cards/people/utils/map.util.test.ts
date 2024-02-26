import { describe, it, expect } from "vitest";
import { mapPeople } from "../../../../cards/people/utils/map.util";
import { PeopleDetailResult } from "../../../../../api/people/models/people-detail-result";

describe("mapPeople", () => {
  it("return null if model is null or undefined", () => {
    expect(mapPeople(null)).toBe(null);
    expect(mapPeople(undefined)).toBe(null);
  });

  it("map PeopleDetailResult without any common attribute to Card", () => {
    const model = {
      name: "Shmi Skywalker",
    } as PeopleDetailResult;

    const expectedModel = {
      title: "Shmi Skywalker",
      properties: {
        eyeColor: {
          translationKey: "cards.people.eyeColor",
          value: undefined,
          rawValue: undefined,
        },
        gender: {
          translationKey: "cards.people.gender",
          value: undefined,
          rawValue: undefined,
        },
        mass: {
          translationKey: "cards.people.mass",
          value: undefined,
          rawValue: undefined,
        },
      },
    };

    expect(mapPeople(model)).toEqual(expectedModel);
  });

  it("map PeopleDetailResult with all common attributes to Card", () => {
    const model = {
      mass: "40",
      eyeColor: "brown",
      gender: "male",
      name: "Shmi Skywalker",
    } as PeopleDetailResult;

    const expectedModel = {
      title: "Shmi Skywalker",
      properties: {
        eyeColor: {
          translationKey: "cards.people.eyeColor",
          value: "brown",
          rawValue: "brown",
        },
        gender: {
          translationKey: "cards.people.gender",
          value: "male",
          rawValue: "male",
        },
        mass: {
          translationKey: "cards.people.mass",
          value: "40",
          rawValue: "40",
        },
      },
    };

    expect(mapPeople(model)).toEqual(expectedModel);
  });
});
