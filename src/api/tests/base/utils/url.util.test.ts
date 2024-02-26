import { describe, it, expect } from "vitest";
import { withParams } from "../../../base/utils/url.util";

describe("withParams", () => {
  it("return empty string when url is not set (undefined, null, empty string) and when params are not set (undefined, null, empty object)", () => {
    const expectedResult = "";

    expect(withParams(undefined, null)).toBe(expectedResult);
    expect(withParams(null, null)).toBe(expectedResult);
    expect(withParams("", null)).toBe(expectedResult);
  });

  it("return url when params are not set (undefined, null, empty object)", () => {
    const expectedResult = "https://test.com";

    expect(withParams(expectedResult, undefined)).toBe(expectedResult);
    expect(withParams(expectedResult, null)).toBe(expectedResult);
    expect(withParams(expectedResult, {})).toBe(expectedResult);
  });

  it("return query string when url is not set (undefined, null, empty string) and params are set", () => {
    const params = { name: "test" };
    const expectedResult = "?name=test";

    expect(withParams(undefined, params)).toBe(expectedResult);
    expect(withParams(null, params)).toBe(expectedResult);
    expect(withParams("", params)).toBe(expectedResult);
  });

  it("return proper query string when params have one property", () => {
    const url = "https://test.com";
    const params = { name: "test" };
    const expectedResult = `${url}?name=test`;

    expect(withParams(url, params)).toBe(expectedResult);
  });

  it("return proper query string when params have more than one property", () => {
    const url = "https://test.com";
    const params = { name: "test", age: 20 };
    const expectedResult = `${url}?name=test&age=20`;

    expect(withParams(url, params)).toBe(expectedResult);
  });

  it("encode params", () => {
    const url = "https://test.com";
    const params = {
      redirectTo: "https://test.com?userId=10",
      provider: "azure",
    };
    const expectedResult = `${url}?redirectTo=https%3A%2F%2Ftest.com%3FuserId%3D10&provider=azure`;

    expect(withParams(url, params)).toBe(expectedResult);
  });
});
