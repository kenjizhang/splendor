import React, { useState, useEffect } from 'react';
import type { CardData, LevelProps } from '../types';
import { useGameStore } from '../store/store';
import { getRandomCards } from '../utils/helper_functions';
import Card from './Card';

export const Level: React.FC<LevelProps> = ({ level }): JSX.Element => {
  const LEVEL = `level_${level}`;
  const deck = useGameStore(
    (state) => state.decks[LEVEL as keyof typeof state.decks]
  );
  const active = useGameStore(
    (state) => state.active[LEVEL as keyof typeof state.decks]
  );
  const { updateDeck, updateActive, drawCard } = useGameStore();

  useEffect(() => {
    if (active.length < 4 && deck.length > 0) {
      const needed = 4 - active.length;
      const allCards = getRandomCards(needed, deck);
      if (allCards) {
        const [newCards, newDeck] = allCards;
        updateDeck(level, newDeck);
        updateActive(level, newCards);
      }
    }
  }, []);

  const handleClick = () => {
    const card = drawCard(1);
    if (card) {
      console.log('drew card ', card);
    } else {
      console.log('deck is empty');
    }
  };

  return (
    <div style={styles.levelContainer}>
      <div>CARDS REMAINING: {deck.length}</div>
      {active.map(({ id, cost, points, token }) => (
        <Card key={id} id={id} points={points} cost={cost} token={token} />
      ))}
    </div>
  );
};

export default Level;

const styles: {
  levelContainer: React.CSSProperties;
} = {
  levelContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
};
