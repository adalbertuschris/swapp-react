import { mapResponseToCamelCase } from "./response.util";
import { CollectionApiResult } from "../models/collection-api-result";
import { CollectionResult } from "../models/collection-result";
import { DetailApiResult } from "../models/detail-api-result";

export const adaptToDetailResult = <T extends object, R>(
  model: T
): R | null => {
  if (!model) {
    return null;
  }

  const mappedResponse = mapResponseToCamelCase<
    T,
    DetailApiResult<Omit<R, "id">>
  >(model);

  return (
    mappedResponse?.result &&
    ({
      id: mappedResponse.result.uid,
      ...mappedResponse.result.properties,
    } as R)
  );
};

export const adaptToCollectionResult = <
  T extends object,
  R extends CollectionResult
>(
  model: T
): R | null => {
  if (!model) {
    return null;
  }

  const mappedResponse = mapResponseToCamelCase<T, CollectionApiResult>(model);

  return {
    totalItems: mappedResponse?.totalRecords || 0,
    totalPages: mappedResponse?.totalPages || 0,
    items: mappedResponse?.results || [],
  } as R;
};
