import { ApiOptions } from "../../../../api/base/models/api-options";
import { CollectionParams } from "../../../../api/base/models/collection-params";
import { CollectionResult } from "../../../../api/base/models/collection-result";

export type ResourceRepository = {
  getAll(
    params?: CollectionParams,
    options?: ApiOptions
  ): Promise<CollectionResult>;
  get<R>(id: number, options?: ApiOptions): Promise<R>;
  get(id: number): Promise<unknown>;
};
