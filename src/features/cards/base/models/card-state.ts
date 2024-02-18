import { CardPlayer } from "./card-player";

export type CardState = {
  isLoading: boolean;
  players: {
    player1: CardPlayer;
    player2: CardPlayer;
  };
};

export const initialCardState: CardState = {
  isLoading: false,
  players: {
    player1: {
      card: null,
      win: false,
      score: 0,
    },
    player2: {
      card: null,
      win: false,
      score: 0,
    },
  },
};
