import React, { useState, useEffect } from 'react';
import { TOKENS } from '../data';
import UserPortal from './UserPortal';
import { useGameStore } from '../store/store';
import type { Player } from '../types';
import styles from './StartPage.module.css';

// form to determine number of players and player names
export default function StartPage() {
  const [currentPlayers, setCurrentPlayers] = useState<Player[]>([]);
  const { addPlayers, fillBank } = useGameStore();

  useEffect(() => {
    if (currentPlayers.length > 0) {
      addPlayers(currentPlayers);
      const startingTokens = TOKENS[currentPlayers.length - 2];
      fillBank(startingTokens);
    }
  }, [currentPlayers, addPlayers, fillBank]);

  return (
    <>
      <div className={styles.startContainer}>
        <UserPortal onPlayerChange={setCurrentPlayers} />
      </div>
    </>
  );
}
