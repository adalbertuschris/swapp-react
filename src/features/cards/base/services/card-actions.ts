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

  const cardPageIndex1 = getRandom(1, totalPages);
  const cardPageIndex2 = getRandom(1, totalPages);

  const card1Request = queryClient.fetchQuery({
    queryKey: [resource, cardPageIndex1],
    queryFn: ({ signal }) => getCard(cardPageIndex1, cardRepository, signal),
  });

  const card2Request = queryClient.fetchQuery({
    queryKey: [resource, cardPageIndex2],
    queryFn: ({ signal }) => getCard(cardPageIndex2, cardRepository, signal),
  });

  return Promise.all([card1Request, card2Request]);
};
