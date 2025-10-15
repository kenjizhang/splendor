export type GameState = {
  decks: {
    level_1: CardData[];
    level_2: CardData[];
    level_3: CardData[];
  };
  active: {
    level_1: CardData[];
    level_2: CardData[];
    level_3: CardData[];
  };
  bank: Record<string, number>;
  players: Player[];
  currentPlayer: Player | null;
  turn: number;
  winner: Player | null;

  // Actions
  updatePlayers: (currentPlayers: Player[]) => void;
  updateCurrentPlayer: (currentPlyr: Player) => void;
  updateBank: (tokens: Record<string, number>) => void;
  updateDeck: (level: 1 | 2 | 3, updatedDeck: CardData[]) => CardData[] | null;
  updateActive: (
    level: 1 | 2 | 3,
    updatedActive: CardData[]
  ) => CardData[] | null;
  drawCard: (level: 1 | 2 | 3) => CardData | null;
  refillSlot: (level: 1 | 2 | 3, index: number) => void;
  updatePlayerTokens: (color: string, amount: number) => void;
  nextTurn: () => void;
};

export interface Cost {
  red: number;
  green: number;
  blue: number;
  black: number;
  white: number;
}

export interface CardData {
  id: number;
  cost: Cost;
  points: number;
  token: string;
}

export interface LevelProps {
  level: 1 | 2 | 3;
}

export interface Player {
  id: number;
  name: string;
  tokens: Record<string, number>;
  cards: CardData[];
  reserved: CardData[];
  score: number;
}

export type UserPortalProps = {
  onPlayerChange: (playerData: Player[]) => void;
};

export type ModalState = {
  isOpen: boolean;
  card: CardData | null;
  openModal: (card: CardData) => void;
  closeModal: () => void;
};
