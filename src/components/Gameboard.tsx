import React from 'react';
import Board from './Board';
import Bank from './Bank';
import Hand from './Hand';
import Opponents from './Opponents';
import CardModal from './CardModal';
import styles from './Gameboard.module.css';

export default function Gameboard() {
  return (
    <div className={styles.gameboardContainer}>
      <CardModal />
      <div className={styles.topLeft}>
        <Board />
        <Bank />
      </div>
      <div className={styles.topRight}>
        <Opponents />
      </div>
      <div className={styles.bottom}>
        <Hand />
      </div>
    </div>
  );
}
