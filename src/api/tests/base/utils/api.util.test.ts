import { describe, it, expect, beforeEach } from "vitest";
import { handleResponse } from "../../../base/utils/api.util";

describe("handleResponse", () => {
  describe("Response with success", () => {
    const expectedResult = '{"name": "test"}';
    let response: Response;

    beforeEach(() => {
      const responseOptions = { status: 200, statusText: "Success" };
      response = new Response(expectedResult, responseOptions);
    });

    it("return model when response status is ok (without adapter)", async () => {
      const result = await handleResponse(Promise.resolve(response));

      expect(result).toEqual(JSON.parse(expectedResult));
    });

    it("return adapted model when response status is ok (with adapter)", async () => {
      const adapter = (model: { name: string }) => model.name;
      const result = await handleResponse(Promise.resolve(response), adapter);

      expect(result).toEqual("test");
    });
  });

  describe("Response with error", () => {
    it("thrown error when response status is not ok", async () => {
      const expectedResult = '{"name": "test"}';
      const responseOptions = {
        status: 500,
        statusText: "Something went wrong",
      };
      const response = new Response(expectedResult, responseOptions);

      await expect(
        handleResponse(Promise.resolve(response))
      ).rejects.toThrowError(new Error("500 Something went wrong"));
    });

    it("thrown error when action thrown error", async () => {
      await expect(
        handleResponse(Promise.reject(new Error("Fail")))
      ).rejects.toThrowError(new Error("Fail"));
    });
  });
});
