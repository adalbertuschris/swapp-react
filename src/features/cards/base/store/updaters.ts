import { CardPlayers } from "../models/card-players";
import { CardState } from "../models/card-state";

export const drawingState = (prevState: CardState) => ({
  ...prevState,
  isLoading: true,
  players: {
    player1: { ...prevState.players.player1, card: null, win: false },
    player2: { ...prevState.players.player2, card: null, win: false },
  },
});

export const drawSuccessState = (
  prevState: CardState,
  players: CardPlayers
) => ({
  ...prevState,
  isLoading: false,
  players: {
    player1: {
      ...prevState.players.player1,
      ...players.player1,
      score: prevState.players.player1.score + (players.player1.win ? 1 : 0),
    },
    player2: {
      ...prevState.players.player2,
      ...players.player2,
      score: prevState.players.player2.score + (players.player2.win ? 1 : 0),
    },
  },
});

export const drawFailureState = (prevState: CardState) => ({
  ...prevState,
  isLoading: false,
  players: {
    player1: { ...prevState.players.player1, card: null, win: false },
    player2: { ...prevState.players.player2, card: null, win: false },
  },
});
