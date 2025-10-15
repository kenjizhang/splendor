import React, { useState } from 'react';
import { useModalStore } from '../store/modalStore';
import type { CardData } from '../types';

export default function Card(card: CardData) {
  const { openModal } = useModalStore();

  const { id, points, cost, token } = card;

  return (
    <div key={id} onClick={() => openModal(card)}>
      <div>POINTS: {points}</div>
      <div>PERM TOKEN: {token}</div>
      <div>
        COST:
        <ul>
          <li key='red'>red: {cost.red}</li>
          <li key='green'>green: {cost.green}</li>
          <li key='blue'>blue: {cost.blue}</li>
          <li key='black'>black: {cost.black}</li>
          <li key='white'>white: {cost.white}</li>
        </ul>
      </div>
    </div>
  );
}
