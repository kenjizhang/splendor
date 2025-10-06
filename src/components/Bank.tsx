import React from 'react';
import { useGameStore } from '../store/store';
import styles from './Bank.module.css';

export default function Bank() {
  const { bank } = useGameStore();

  if (!bank) return null;

  return (
    <>
      <div className={styles.bankContainer}>
        <div>RED: {bank.red}</div>
        <div>GREEN: {bank.green}</div>
        <div>BLUE: {bank.blue}</div>
        <div>BLACK: {bank.black}</div>
        <div>WHITE: {bank.white}</div>
        <div>GOLD: {bank.gold}</div>
      </div>
    </>
  );
}
