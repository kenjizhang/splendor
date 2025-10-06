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
  turn: 0,
  winner: null,
  addPlayers: (currentPlayers) => {
    set(() => ({ players: currentPlayers }));
  },
  fillBank: (tokens) => {
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
  takeTokens: (tokens) => {
    // implement token restriction logic with buttons
    // if no tokens left, no button.
    // if less than X amt of tokens left and already have that color taken, disable button
    set((state) => {
      const updatedBank = { ...state.bank };

      for (const color in tokens) {
        if (updatedBank[color] !== 0) {
          updatedBank[color] -= tokens[color];
        }
      }
      return { bank: updatedBank };
    });
  },
  buyCard: (playerId, card, level, index) => {
    // check that player has enough tokens
    set((state) => {
      const updatedBank = { ...state.bank };
      const cardCost = card.cost;
      const playerIndex = state.players.findIndex(({ id }) => playerId === id);
      if (playerIndex !== -1) {
        const updatedPlayers = [...state.players];
        const updatedCurrentPlayer = { ...updatedPlayers[playerIndex] };
        const updatedCurrentPlayerTokens = { ...updatedCurrentPlayer.tokens };
        if (updatedCurrentPlayerTokens) {
          for (const color of Object.keys(cardCost) as Array<
            keyof typeof cardCost
          >) {
            if (updatedCurrentPlayerTokens[color] >= cardCost[color]) {
              updatedCurrentPlayerTokens[color] -= cardCost[color];
              updatedBank[color] += cardCost[color];
            }
          }
          updatedCurrentPlayer.tokens = updatedCurrentPlayerTokens;
        }
        updatedPlayers[playerIndex] = updatedCurrentPlayer;
        return { bank: updatedBank, players: updatedPlayers };
      }
      // Always return a valid Partial<GameState>
      return {};
    });
    // update score of player***
  },
  nextTurn: () => {
    // check players for winners (score >= 15)
  },
}));
