import React from 'react';
import { useGameStore } from '../store/store';
import styles from './Hand.module.css';

export default function Hand() {
  const {
    currentPlayer,
    nextTurn,
    assignCurrentPlayer,
    players,
    updatePlayers,
  } = useGameStore();

  // Early return if no current player
  if (!currentPlayer) return null;

  // Destructure with TypeScript type safety
  const { id, name, tokens, cards, reserved, score } = currentPlayer;

  const handleEndTurn = () => {
    const updatedPlayers = players.map((player) =>
      player.id === currentPlayer.id ? currentPlayer : player
    );
    updatePlayers(updatedPlayers);
    nextTurn();
    const nextId = id + 1;
    if (nextId > players.length - 1) {
      assignCurrentPlayer(players[0]);
    } else {
      assignCurrentPlayer(players[nextId]);
    }
  };

  if (tokens) {
    console.log(tokens, Object.entries(tokens));
  }

  return (
    <>
      {currentPlayer && (
        <div className={styles.handContainer}>
          <div className={styles.left}>
            {reserved?.map((reservedCard) => (
              <div>
                {Object.entries(reservedCard.cost).map(([token, count]) => (
                  <span key={token}>
                    {token}: {count}{' '}
                  </span>
                ))}
                {reservedCard.token}
                {reservedCard.points}
              </div>
            ))}
          </div>
          <div className={styles.middle}>
            {tokens &&
              Object.entries(tokens).map(([token, count]) => (
                <span key={token}>
                  {token}: {count}{' '}
                </span>
              ))}
            {cards?.map((card) => (
              <div>
                {card.token}
                {card.points}
              </div>
            ))}
          </div>
          <div className={styles.right}>
            <p>
              <strong>{name}</strong>
            </p>
            <p>POINTS: {score} / 15</p>
            <button onClick={handleEndTurn}>End Turn</button>
          </div>
        </div>
      )}
    </>
  );
}
