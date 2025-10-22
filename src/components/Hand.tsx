import React from 'react';
import { useGameStore } from '../store/store';
import styles from './Hand.module.css';
import FireIcon from '../assets/Fire.ico';
import GrassIcon from '../assets/Grass.ico';
import GroundIcon from '../assets/Ground.ico';
import NormalIcon from '../assets/Normal.ico';
import WaterIcon from '../assets/Water.ico';
import DragonIcon from '../assets/Dragon.ico';

export default function Hand() {
  const { currentPlayer, nextTurn } = useGameStore();

  // Early return if no current player
  if (!currentPlayer) return null;

  // Destructure with TypeScript type safety
  const { id, name, tokens, cards, reserved, score } = currentPlayer;

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
            {tokens && (
              <div className={styles.tokenContainer}>
                <div>
                  <span>{tokens['red']}</span>
                  <img src={FireIcon} className={styles.fireIcon} />
                </div>
                <div>
                  <span>{tokens['green']}</span>
                  <img src={GrassIcon} className={styles.grassIcon} />
                </div>
                <div>
                  <span>{tokens['blue']}</span>
                  <img src={WaterIcon} className={styles.waterIcon} />
                </div>
                <div>
                  <span>{tokens['black']}</span>
                  <img src={GroundIcon} className={styles.groundIcon} />
                </div>
                <div>
                  <span>{tokens['white']}</span>
                  <img src={NormalIcon} className={styles.normalIcon} />
                </div>
                <div>
                  <span>{tokens['gold']}</span>
                  <img src={DragonIcon} className={styles.dragonIcon} />
                </div>
              </div>
            )}
            {cards?.map(({ id, token, points }) => (
              <div id={id.toString()}>
                CARDS:
                <span>TOKEN: {token}</span>
                <span>POINTS: {points}</span>
              </div>
            ))}
          </div>
          <div className={styles.right}>
            <h1>
              <strong>{name}</strong>
            </h1>
            <p>POINTS: {score} / 15</p>
            <button onClick={() => nextTurn()}>End Turn</button>
          </div>
        </div>
      )}
    </>
  );
}
