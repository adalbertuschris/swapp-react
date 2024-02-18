import { useTranslation } from "react-i18next";
import { CardPlayer } from "../../models/card-player";
import classes from "./CardPlayer.module.css";
import Card from "../card/Card";
import Spinner from "../../../../../shared/components/spinner/Spinner";

type CardPlayerProps = {
  name: string;
  player: CardPlayer;
  isLoading: boolean;
};

function CardPlayer({ name, player, isLoading }: CardPlayerProps) {
  const { t } = useTranslation();

  return (
    <div
      data-test="player"
      className={`${classes["card-player"]} ${
        player.win ? classes["win"] : ""
      }`}
    >
      <h3 data-test="player-name" className={classes["player-name"]}>
        {name}
        {player.win && (
          <span className={classes["win-label"]}>
            {t("general.win").toUpperCase()}
          </span>
        )}
      </h3>

      <h4 data-test="score" className={classes["player-score"]}>
        {t("general.score")}: {player.score}
      </h4>

      <div className={classes["card-container"]}>
        {isLoading ? (
          <Spinner data-test="card-spinner" className={classes["spinner"]} />
        ) : player.card ? (
          <Card data-test="card" card={player.card} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default CardPlayer;
