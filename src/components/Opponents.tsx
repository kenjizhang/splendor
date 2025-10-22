import React from 'react';
import { useGameStore } from '../store/store';
import styles from './Opponents.module.css';

export default function Opponents() {
  const { players, currentPlayer } = useGameStore();

  if (!players || !currentPlayer) return null;

  const opponents = players.filter(({ id }) => id !== currentPlayer.id);

  return (
    <div className={styles.opponentsContainer}>
      {opponents.map(({ id, name, tokens, cards, reserved, score }) => (
        <div key={id} className={styles.opponentCard}>
          {name}
          {Object.entries(tokens).map(([token, count]) => (
            <span key={token}>
              {token}: {count}{' '}
            </span>
          ))}
          {score}
          {cards.map(({ id, token, points }) => (
            <div id={id.toString()}>
              <span>TOKEN: {token}</span>
              <span>POINTS: {points}</span>
            </div>
          ))}
          {/* {reserved} */}
        </div>
      ))}
    </div>
  );
}
