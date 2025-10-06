import React, { useState } from 'react';
import type { UserPortalProps, Player } from '../types';
import styles from './UserStartModal.module.css';

// create player info in modal. $ of players -> names of players
export default function UserStartModal({ onPlayerChange }: UserPortalProps) {
  const [numOfPlayers, setNumOfPlayers] = useState<number>(2);
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);

  const handleNumOfPlayersChange = (n: number) => {
    const playerNamesPlaceholder = new Array(n).fill('');
    setPlayerNames(playerNamesPlaceholder);
    setNumOfPlayers(n);
  };

  const handleChange = (i: number, value: string) => {
    const updatedPlayerNames = [...playerNames];
    updatedPlayerNames[i] = value;
    setPlayerNames(updatedPlayerNames);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const playerData: Player[] = playerNames.map((playerName, i) => ({
      id: i,
      name: playerName,
      tokens: {},
      cards: [],
      reserved: [],
      score: 0,
    }));
    onPlayerChange(playerData);
    console.log('Player names: ', playerNames);
  };

  return (
    <div className={styles.userStartModalContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.formLabel}>
          {'Number of trainers: '}
          <select
            value={numOfPlayers}
            onChange={(e) => handleNumOfPlayersChange(Number(e.target.value))}
            className={styles.formSelect}
          >
            {[2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        {playerNames.map((name, i) => (
          <input
            key={i}
            type='text'
            placeholder={`Trainer ${i + 1} name`}
            value={name}
            onChange={(e) => handleChange(i, e.target.value)}
            required
            className={styles.formInput}
          />
        ))}
        <button type='submit' className={styles.formBtn}>
          START
        </button>
      </form>
    </div>
  );
}
