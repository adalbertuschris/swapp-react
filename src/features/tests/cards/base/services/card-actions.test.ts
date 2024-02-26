import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { cards, resourceItems0, resourceItems1, resourceItems2 } from "./data";
import { draw } from "../../../../cards/base/services/card-actions";
import { queryClient } from "../../../../../api/base/api-client";
import { CardRepository } from "../../../../cards/base/models/card-repository";
import { ApiOptions } from "../../../../../api/base/models/api-options";
import { CollectionParams } from "../../../../../api/base/models/collection-params";
import { CollectionResult } from "../../../../../api/base/models/collection-result";

describe("draw", () => {
  let get: Mock<[number, ApiOptions], Promise<unknown>>;
  let getAll: Mock<[CollectionParams, ApiOptions], Promise<CollectionResult>>;
  let repository: CardRepository;

  beforeEach(() => {
    queryClient.clear();

    get = vi
      .fn()
      .mockReturnValueOnce(Promise.resolve(cards[0]))
      .mockReturnValue(Promise.resolve(cards[1]));

    getAll = vi
      .fn()
      .mockReturnValueOnce(Promise.resolve(resourceItems0))
      .mockReturnValueOnce(Promise.resolve(resourceItems1))
      .mockReturnValue(Promise.resolve(resourceItems2));

    repository = {
      get,
      getAll,
    };
  });

  it("using getAll method to fetch totalPages (in first request)", async () => {
    await expect(draw("people", repository, () => {})).resolves.toEqual(cards);
    expect(getAll).toHaveBeenCalled();
    expect(getAll.mock.calls[0]).toEqual([
      {
        page: 1,
        limit: 1,
      },
      expect.anything(),
    ]);
  });

  it("call repository.getAll 3 times during drawing", async () => {
    await expect(draw("people", repository, () => {})).resolves.toEqual(cards);
    expect(getAll).toHaveBeenCalledTimes(3);
  });

  it("call repository.get 2 times during drawing", async () => {
    await expect(draw("people", repository, () => {})).resolves.toEqual(cards);
    expect(get).toHaveBeenCalledTimes(2);
    expect(get.mock.calls[0]).toEqual([1, expect.anything()]);
    expect(get.mock.calls[1]).toEqual([2, expect.anything()]);
  });

  it("return random cards", async () => {
    await expect(draw("people", repository, () => {})).resolves.toEqual(cards);
    expect(getAll.mock.calls[1][0].page).not.toEqual(
      getAll.mock.calls[2][0].page
    );
  });

  it("cache requests when draw is called more than once", async () => {
    await draw("people", repository, () => {});
    expect(getAll).toHaveBeenCalledTimes(3);
    await draw("people", repository, () => {});
    expect(getAll).toHaveBeenCalledTimes(5);
  });

  it("rejects when repository.getAll thrown error", async () => {
    getAll.mockReset().mockRejectedValue(new Error("Fail"));
    await expect(draw("people", repository, () => {})).rejects.toThrowError(
      new Error("Fail")
    );
  });

  it("rejects when repository.get thrown error", async () => {
    get.mockReset().mockRejectedValue(new Error("Fail"));
    await expect(draw("people", repository, () => {})).rejects.toThrowError(
      new Error("Fail")
    );
  });

  it("rejects when repository.getAll return no items (has no items in db)", async () => {
    getAll
      .mockReset()
      .mockReturnValue(
        Promise.resolve({ items: [], totalPages: 0, totalItems: 0 })
      );
    await expect(draw("people", repository, () => {})).rejects.toThrowError(
      new Error("No items")
    );
  });

  it("rejects when drawed item not exists", async () => {
    getAll
      .mockReset()
      .mockReturnValueOnce(Promise.resolve(resourceItems0)) // total pages
      .mockReturnValue(
        Promise.resolve({ items: [], totalPages: 0, totalItems: 0 })
      );
    await expect(draw("people", repository, () => {})).rejects.toThrowError(
      new Error("No item")
    );
  });
});
