import { create } from 'zustand';
import type { GameState } from '../types';
import { LEVEL_1, LEVEL_2, LEVEL_3 } from '../data';

export const useGameStore = create<GameState>((set, get) => ({
  decks: {
    level_1: LEVEL_1,
    level_2: LEVEL_2,
    level_3: LEVEL_3,
  },
  active: {
    level_1: [],
    level_2: [],
    level_3: [],
  },
  bank: {
    red: 0,
    green: 0,
    blue: 0,
    black: 0,
    white: 0,
    gold: 0,
  },
  players: [],
  currentPlayer: null,
  turn: 0,
  winner: null,
  updatePlayers: (updatedPlayers) => {
    set(() => ({ players: updatedPlayers }));
  },
  updateCurrentPlayer: (currentPlyr) => {
    set({ currentPlayer: currentPlyr });
  },
  updateBank: (tokens) => {
    set(() => ({ bank: tokens }));
  },
  updateDeck: (level, updatedDeck) => {
    set((state) => ({
      decks: { ...state.decks, [`level_${level}`]: updatedDeck },
    }));
    // Return the updated deck or null if empty
    return updatedDeck.length > 0 ? updatedDeck : null;
  },
  updateActive: (level, updatedActive) => {
    set((state) => ({
      active: { ...state.active, [`level_${level}`]: updatedActive },
    }));
    // Return the updated deck or null if empty
    return updatedActive.length > 0 ? updatedActive : null;
  },
  drawCard: (level) => {
    const key = `level_${level}` as const;
    const { decks } = get();

    // no cards left
    if (decks[key].length === 0) return null;

    // takes first card
    const [card, ...rest] = decks[key];

    set((state) => ({
      decks: {
        ...state.decks,
        [key]: rest,
      },
    }));
    return card;
  },
  drawCardincrease: () => {}, // Implement logic as needed
  refillSlot: () => {}, // Implement logic as needed
  updatePlayerTokens: (color, amount) => {
    set((state) => {
      if (!state.currentPlayer) return {};
      return {
        currentPlayer: {
          ...state.currentPlayer,
          tokens: { ...state.currentPlayer.tokens, [color]: amount },
        },
      };
    });
  },
  nextTurn: () => {
    set((state) => {
      if (!state.currentPlayer) return {};
      const updatedPlayers = state.players.map((player) =>
        player.id === state.currentPlayer!.id ? state.currentPlayer! : player
      );
      // check players for winners (score >= 15)
      if (state.currentPlayer.score >= 15) {
        return { winner: state.currentPlayer };
      } else {
        const nextId = state.currentPlayer.id + 1;
        if (nextId > state.players.length - 1) {
          state.updateCurrentPlayer(state.players[0]);
        } else {
          state.updateCurrentPlayer(state.players[nextId]);
        }
        return { players: updatedPlayers };
      }
    });
  },
}));
