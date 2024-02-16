import { CollectionParams } from "../../base/models/collection-params";
import { withParams } from "../../base/utils/url.util";
import { CollectionResult } from "../../base/models/collection-result";
import {
  adaptToCollectionResult,
  adaptToDetailResult,
} from "../../base/utils/adapt.util";
import { PeopleDetailResult } from "../models/people-detail-result";
import { baseUrl } from "../../base/api-client";
import { ApiOptions } from "../../base/models/api-options";
import { handleResponse } from "../../base/utils/api.util";

const resourceUrl = `${baseUrl}/people`;

export const getAll = async (
  params?: CollectionParams,
  options?: ApiOptions
): Promise<CollectionResult> =>
  handleResponse(
    fetch(withParams(resourceUrl, params), {
      signal: options?.cancel,
    }),
    adaptToCollectionResult
  );

export const get = async (
  id: number,
  options?: ApiOptions
): Promise<PeopleDetailResult> =>
  handleResponse(
    fetch(`${resourceUrl}/${id}`, {
      signal: options?.cancel,
    }),
    adaptToDetailResult
  );
