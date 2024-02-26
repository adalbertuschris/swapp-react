import { describe, it, expect } from "vitest";
import {
  adaptToCollectionResult,
  adaptToDetailResult,
} from "../../../base/utils/adapt.util";

describe("adaptToDetailResult", () => {
  it("return null if model is null or undefined", () => {
    expect(adaptToDetailResult(null)).toBe(null);
    expect(adaptToDetailResult(undefined)).toBe(null);
  });

  it("return undefined if model has no result", () => {
    const model = {
      message: "test",
    };

    expect(adaptToDetailResult(model)).toBe(undefined);
  });

  it("return model only with id if model has no properties", () => {
    const model = {
      message: "test",
      result: {
        uid: "1",
      },
    };

    const expectedResult = {
      id: "1",
    };

    expect(adaptToDetailResult(model)).toEqual(expectedResult);
  });

  it("return adapted model with id and convertedProperties (from snake_case to camel_case)", () => {
    const model = {
      message: "test",
      result: {
        properties: {
          eye_color: "brown",
          gender: "male",
        },
        description: "description",
        _id: "1",
        uid: "2",
        __v: "3",
      },
    };

    const expectedResult = {
      id: "2",
      eyeColor: "brown",
      gender: "male",
    };

    expect(adaptToDetailResult(model)).toEqual(expectedResult);
  });
});

describe("adaptToCollectionResult", () => {
  it("return null if model is null or undefined", () => {
    expect(adaptToCollectionResult(null)).toBe(null);
    expect(adaptToCollectionResult(undefined)).toBe(null);
  });

  it("return adapted model if model has no results", () => {
    const model = {
      message: "test",
    };

    const expectedResult = {
      totalItems: 0,
      totalPages: 0,
      items: [],
    };

    expect(adaptToCollectionResult(model)).toEqual(expectedResult);
  });

  it("return adapted model", () => {
    const model = {
      message: "test",
      total_records: 2,
      total_pages: 1,
      previous: "",
      next: "",
      results: [
        { uid: "1", name: "item 1", url: "" },
        { uid: "2", name: "item 2", url: "" },
      ],
    };

    const expectedResult = {
      totalItems: 2,
      totalPages: 1,
      items: [
        { uid: "1", name: "item 1", url: "" },
        { uid: "2", name: "item 2", url: "" },
      ],
    };

    expect(adaptToCollectionResult(model)).toEqual(expectedResult);
  });
});
