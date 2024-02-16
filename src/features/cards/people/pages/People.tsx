import { get, getAll } from "../../../../api/people/services/people-api";
import CardsGame from "../../base/components/cards-game/CardsGame";
import { mapPeople } from "../utils/map.util";
import { comparePeople } from "../utils/compare.util";

const repository = {
  get,
  getAll,
};

function PeoplePage() {
  return (
    <CardsGame
      repository={repository}
      compare={comparePeople}
      map={mapPeople}
    ></CardsGame>
  );
}

export default PeoplePage;
