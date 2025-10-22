import React from 'react';
import { useModalStore } from '../store/modalStore';
import { useGameStore } from '../store/store';
import styles from './CardModal.module.css';

export default function CardModal() {
  const { isOpen, card, closeModal } = useModalStore();
  const {
    nextTurn,
    currentPlayer,
    bank,
    updateBank,
    updateCurrentPlayer,
    drawCard,
    active,
    updateActive,
  } = useGameStore();
  if (!card || !isOpen) {
    return null;
  }
  const { id, points, token, cost, level } = card;

  const handleBuy = () => {
    // check that player has enough token
    const updatedBank = bank;
    const cardCost = card.cost;
    const buyer = currentPlayer;
    if (!buyer || !buyer.tokens) {
      console.log('NO BUYER OR TOKENS');
      return {};
    }
    const updatedBuyerTokens = buyer.tokens;
    const permTokens = {
      red: 0,
      green: 0,
      blue: 0,
      black: 0,
      white: 0,
    };
    if (buyer) {
      for (const card of buyer.cards) {
        permTokens[card.token as keyof typeof permTokens] += 1;
      }
    }
    // first delete permTokens from cost, then use buyers tokens
    for (const color in cardCost) {
      const tokenColor = color as keyof typeof cardCost;
      cardCost[tokenColor] = cardCost[tokenColor] - permTokens[tokenColor];
    }
    // delete buyer's tokens from cost and updatedBank
    for (const color in cardCost) {
      const tokenColor = color as keyof typeof cardCost;
      if (
        cardCost[tokenColor] > 0 &&
        updatedBuyerTokens[tokenColor] >= cardCost[tokenColor]
      ) {
        updatedBuyerTokens[tokenColor] -= cardCost[tokenColor];
        updatedBank[tokenColor] += cardCost[tokenColor];
        cardCost[tokenColor] = 0;
      }
    }
    // check that cost is all <= 0. if not, check if player has enough gold coins
    let remainingCost = 0;
    for (const color in cardCost) {
      const tokenColor = color as keyof typeof cardCost;
      if (cardCost[tokenColor] >= 0) {
        remainingCost += cardCost[tokenColor];
      }
    }
    if (remainingCost > 0) {
      if (buyer.tokens.gold >= remainingCost) {
        updatedBuyerTokens['gold'] -= remainingCost;
        updatedBank['gold'] += remainingCost;
      } else {
        // not enough tokens
        console.log('NOT ENOUGH TOKENS');
        return;
      }
    }
    const updatedBuyerCards = [...currentPlayer.cards, card];
    const updatedPlayer = {
      ...currentPlayer,
      tokens: updatedBuyerTokens,
      cards: updatedBuyerCards,
      score: currentPlayer.score + card.points,
    };

    updateCurrentPlayer(updatedPlayer);
    updateBank(updatedBank);

    closeModal();
    // SET NEW CARD
    const newCard = drawCard(level);
    const updatedActive = active[`level_${level}`].filter(
      (card) => card.id !== id
    );
    if (newCard && updateActive) {
      updateActive(level, [...updatedActive, newCard]);
    }
    nextTurn();
  };

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
            <li key='black'>black: {cost.black}</li>
            <li key='white'>white: {cost.white}</li>
          </ul>
        </div>
        <button onClick={handleBuy}>Buy</button>
        <button>Reserve</button>
        <button onClick={closeModal}>X</button>
      </div>
    </div>
  );
}
