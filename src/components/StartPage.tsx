import React, { useState, useEffect } from 'react';
import { TOKENS } from '../data';
import UserPortal from './UserPortal';
import { useGameStore } from '../store/store';
import type { Player } from '../types';
import styles from './StartPage.module.css';

// form to determine number of players and player names
export default function StartPage() {
  const [newPlayers, setNewPlayers] = useState<Player[]>([]);
  const { updatePlayers, updateBank, updateCurrentPlayer } = useGameStore();

  useEffect(() => {
    if (newPlayers.length > 0) {
      updatePlayers(newPlayers);
      updateCurrentPlayer(newPlayers[0]);
      const startingTokens = TOKENS[newPlayers.length - 2];
      updateBank(startingTokens);
    }
  }, [newPlayers, updatePlayers, updateBank, updateCurrentPlayer]);

  return (
    <>
      <div className={styles.startContainer}>
        <UserPortal onPlayerChange={setNewPlayers} />
      </div>
    </>
  );
}
