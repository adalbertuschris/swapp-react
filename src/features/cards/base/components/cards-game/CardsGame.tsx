import { useQuery } from "@tanstack/react-query";
import { ResourceRepository } from "../../models/resource-repository";
import { Card } from "../../models/card";

type CardsGameProps = {
  repository: ResourceRepository;
  compare: ([card1, card2]: [Card, Card]) => number;
  map: (model: unknown) => Card;
};

function CardsGame({ repository, compare, map }: CardsGameProps) {
  const { data } = useQuery({
    queryKey: ["people"],
    queryFn: ({ signal }) =>
      repository.getAll({ page: 1, limit: 1 }, { cancel: signal }),
  });

  console.log(data);

  return <div>{data?.totalItems}</div>;
}

export default CardsGame;
