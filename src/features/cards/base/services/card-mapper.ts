import { Card } from "../models/card";
import { CardPlayers } from "../models/card-players";

export const mapCardResponses = (
  data: [Record<string, unknown>, Record<string, unknown>],
  compare: ([card1, card2]: [Card, Card]) => number,
  map: (model: Record<string, unknown>) => Card
): CardPlayers => {
  const [card1, card2] = [map(data[0]), map(data[1])];
  const winner = compare([card1, card2]);
  const isPlayer1Winner = [0, 1].includes(winner);
  const isPlayer2Winner = [0, -1].includes(winner);

  return {
    player1: {
      card: card1,
      win: isPlayer1Winner,
    },
    player2: {
      card: card2,
      win: isPlayer2Winner,
    },
  };
};
