import { create } from 'zustand';
import type { CardData, ModalState } from '../types';

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  card: null,
  openModal: (card: CardData) => set({ isOpen: true, card }),
  closeModal: () => set({ isOpen: false }),
}));
