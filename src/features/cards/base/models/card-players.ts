import { Card } from "./card";

export type CardPlayers = {
  player1: {
    card: Card;
    win: boolean;
  };
  player2: {
    card: Card;
    win: boolean;
  };
};
