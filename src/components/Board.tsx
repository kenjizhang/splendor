import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/store';
import Level from './Level';
import styles from './Board.module.css';

export default function Board() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) return <div>LOADING DECK...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className={styles.boardContainer}>
        <Level level={3} />
        <Level level={2} />
        <Level level={1} />
      </div>
    </>
  );
}
