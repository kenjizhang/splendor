import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import UserStartModal from './UserStartModal';
import type { UserPortalProps } from '../types';
import styles from './UserPortal.module.css';

export default function UserPortal({ onPlayerChange }: UserPortalProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      {!showModal && (
        <button className={styles.btn} onClick={() => setShowModal(true)}>
          PLAY
        </button>
      )}
      {showModal && <UserStartModal onPlayerChange={onPlayerChange} />}
    </>
  );
}
