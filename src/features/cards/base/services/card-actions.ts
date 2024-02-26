import { queryClient } from "../../../../api/base/api-client";
import { CollectionResult } from "../../../../api/base/models/collection-result";
import { getRandom } from "../../../../common/utils/number.util";
import { CardRepository } from "../models/card-repository";

const getCard = async (
  pageIndex: number,
  cardRepository: CardRepository,
  signal: AbortSignal
): Promise<Record<string, unknown>> => {
  const resourceResult = await cardRepository.getAll(
    {
      page: pageIndex,
      limit: 1,
    },
    { cancel: signal }
  );

  const itemId = resourceResult?.items?.[0]?.uid;

  if (itemId && !isNaN(+itemId)) {
    return cardRepository.get(+itemId, { cancel: signal });
  } else {
    return Promise.reject("No item");
  }
};

const getTotalPages = (
  cardRepository: CardRepository,
  signal: AbortSignal
): Promise<CollectionResult> =>
  cardRepository.getAll(
    {
      page: 1,
      limit: 1,
    },
    { cancel: signal }
  );

const drawCard = (
  resource: string,
  cardRepository: CardRepository,
  totalPages: number
) => {
  const cardPageIndex = getRandom(1, totalPages);

  return queryClient.fetchQuery({
    queryKey: [resource, cardPageIndex],
    queryFn: ({ signal }) => getCard(cardPageIndex, cardRepository, signal),
  });
};

export const draw = async (
  resource: string,
  cardRepository: CardRepository,
  cancellationHandler: (callback: () => void) => void
): Promise<[Record<string, unknown>, Record<string, unknown>]> => {
  cancellationHandler(() =>
    queryClient.cancelQueries({ queryKey: [resource] })
  );

  const totalPagesRequest = queryClient.fetchQuery({
    queryKey: [resource, "totalPages"],
    queryFn: ({ signal }) => getTotalPages(cardRepository, signal),
    staleTime: 60000,
  });

  const totalPages = (await totalPagesRequest)?.totalPages;

  return Promise.all([
    drawCard(resource, cardRepository, totalPages),
    drawCard(resource, cardRepository, totalPages),
  ]);
};
