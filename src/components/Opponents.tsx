import React from 'react';
import { useGameStore } from '../store/store';

export default function Opponents() {
  const { players, currentPlayer } = useGameStore();

  if (!players || !currentPlayer) return null;

  const opponents = players.filter(({ id }) => id !== currentPlayer.id);

  return (
    <>
      {opponents.map(({ id, name, tokens, cards, reserved, score }) => (
        <div key={id}>
          {name}
          {Object.entries(tokens).map(([token, count]) => (
            <span key={token}>
              {token}: {count}{' '}
            </span>
          ))}
          {score}
          {/* {cards.map((card) => (
            <div>
              {card}
              </div>
          ))}
          {reserved} */}
        </div>
      ))}
    </>
  );
}
