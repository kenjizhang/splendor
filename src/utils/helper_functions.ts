import type { CardData } from '../types';

export function getRandomCards(count: number, cards: CardData[]) {
  if (!cards.length) return;

  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const picked = shuffled.slice(0, count);
  const remainder = shuffled.slice(count);

  return [picked, remainder];
}

export function hasDuplicate(colors: string[]) {
  return new Set(colors).size !== colors.length;
}
