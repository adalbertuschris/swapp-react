import { get, getAll } from "../../../../api/starships/services/starship-api";
import CardsGame from "../../base/components/cards-game/CardsGame";
import { mapStarship } from "../utils/map.util";
import { compareStarships } from "../utils/compare.util";

const repository = {
  get,
  getAll,
};

function StarshipPage() {
  return (
    <CardsGame
      resource="starships"
      titleKey="cards.starships.title"
      repository={repository}
      compare={compareStarships}
      map={mapStarship}
    ></CardsGame>
  );
}

export default StarshipPage;
