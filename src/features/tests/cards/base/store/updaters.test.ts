import { describe, it, expect } from "vitest";
import { CardState } from "../../../../cards/base/models/card-state";
import {
  drawFailureState,
  drawSuccessState,
  drawingState,
} from "../../../../cards/base/store/updaters";
import { Card } from "../../../../cards/base/models/card";
import { CardPlayers } from "../../../../cards/base/models/card-players";

const state: CardState = {
  isLoading: false,
  players: {
    player1: {
      card: { title: "card 1" } as Card,
      win: false,
      score: 1,
    },
    player2: {
      card: { title: "card 2" } as Card,
      win: true,
      score: 2,
    },
  },
};

describe("Cards store", () => {
  describe("drawingState", () => {
    it("return proper new state", () => {
      const expectedResult = {
        isLoading: true,
        players: {
          player1: {
            card: null,
            win: false,
            score: 1,
          },
          player2: {
            card: null,
            win: false,
            score: 2,
          },
        },
      };

      const newState = drawingState(state);

      expect(newState).not.toBe(state);
      expect(newState).toEqual(expectedResult);
    });
  });

  describe("drawSuccessState", () => {
    it("return proper new state", () => {
      const players: CardPlayers = {
        player1: {
          card: { title: "card 1_1" } as Card,
          win: true,
        },
        player2: {
          card: { title: "card 2_2" } as Card,
          win: false,
        },
      };

      const expectedResult = {
        isLoading: false,
        players: {
          player1: {
            ...players.player1,
            score: 2,
          },
          player2: {
            ...players.player2,
            score: 2,
          },
        },
      };

      const newState = drawSuccessState(state, players);

      expect(newState).not.toBe(state);
      expect(newState).toEqual(expectedResult);
    });
  });

  describe("drawFailureState", () => {
    it("return proper new state", () => {
      const expectedResult = {
        isLoading: false,
        players: {
          player1: {
            card: null,
            win: false,
            score: 1,
          },
          player2: {
            card: null,
            win: false,
            score: 2,
          },
        },
      };

      const newState = drawFailureState(state);

      expect(newState).not.toBe(state);
      expect(newState).toEqual(expectedResult);
    });
  });
});
