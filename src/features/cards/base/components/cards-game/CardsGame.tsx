import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import classes from "./CardsGame.module.css";
import CardPlayer from "../card-player/CardPlayer";
import CardContainer from "../card-container/CardContainer";
import { CardRepository } from "../../models/card-repository";
import { Card } from "../../models/card";
import { draw } from "../../services/card-actions";
import { mapCardResponses } from "../../services/card-mapper";
import { initialCardState } from "../../models/card-state";
import {
  drawFailureState,
  drawSuccessState,
  drawingState,
} from "../../store/updaters";
import Button from "../../../../../shared/components/button/Button";

type CardsGameProps = {
  resource: string;
  titleKey: string;
  repository: CardRepository;
  compare: ([card1, card2]: [Card, Card]) => number;
  map: (model: Record<string, unknown>) => Card;
};

function CardsGame({
  resource,
  titleKey,
  repository,
  compare,
  map,
}: CardsGameProps) {
  const { t } = useTranslation();
  const [state, setState] = useState(initialCardState);
  const cancel = useRef(() => {});

  useEffect(() => {
    return () => cancel.current();
  }, []);

  const handleDraw = async () => {
    setState((prevState) => drawingState(prevState));

    try {
      const data = await draw(
        resource,
        repository,
        (callback) => (cancel.current = callback)
      );

      const players = mapCardResponses(data, compare, map);
      setState((prevState) => drawSuccessState(prevState, players));
    } catch (error) {
      setState((prevState) => drawFailureState(prevState));
    }
  };

  return (
    <div className={classes["cards-game"]}>
      <h1>{t(titleKey)}</h1>

      <div className={classes["action-container"]}>
        <Button
          data-test="play-button"
          type="button"
          disabled={state?.isLoading}
          onClick={handleDraw}
        >
          {t("general.play")}
        </Button>
      </div>

      <div className={classes["card-container"]}>
        <CardContainer>
          {state?.players.player1 && (
            <CardPlayer
              name={t("players.player1")}
              player={state?.players.player1}
              isLoading={state?.isLoading}
            />
          )}
        </CardContainer>

        <CardContainer>
          {state?.players.player2 && (
            <CardPlayer
              name={t("players.computer")}
              player={state?.players.player2}
              isLoading={state?.isLoading}
            />
          )}
        </CardContainer>
      </div>
    </div>
  );
}

export default CardsGame;
