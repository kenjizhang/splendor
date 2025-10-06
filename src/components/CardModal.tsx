import React from 'react';
import { useModalStore } from '../store/modalStore';
import styles from './CardModal.module.css';

export default function CardModal() {
  const { isOpen, card, closeModal } = useModalStore();
  if (!card || !isOpen) {
    return null;
  }
  const { id, points, token, cost } = card;

  return (
    <div key={id} className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div>POINTS: {points}</div>
        <div>PERM TOKEN: {token}</div>
        <div>
          COST:
          <ul>
            <li key='red'>red: {cost.red}</li>
            <li key='green'>green: {cost.green}</li>
            <li key='blue'>blue: {cost.blue}</li>
            <li key='white'>white: {cost.white}</li>
            <li key='black'>black: {cost.black}</li>
          </ul>
        </div>
        <button>Buy</button>
        <button>Reserve</button>
        <button onClick={closeModal}>X</button>
      </div>
    </div>
  );
}
