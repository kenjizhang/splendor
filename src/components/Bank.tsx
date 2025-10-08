import React, { useState } from 'react';
import { hasDuplicate } from '../utils/helper_functions';
import { useGameStore } from '../store/store';
import styles from './Bank.module.css';
import FireIcon from '../assets/Fire.ico';
import GrassIcon from '../assets/Grass.ico';
import GroundIcon from '../assets/Ground.ico';
import NormalIcon from '../assets/Normal.ico';
import WaterIcon from '../assets/Water.ico';
import DragonIcon from '../assets/Dragon.ico';

export default function Bank() {
  const [tokensTaken, setTokensTaken] = useState<string[]>([]);

  const { bank, updateBank, currentPlayer, updatePlayerTokens } =
    useGameStore();

  const handleClick = (color: string) => {
    if (tokensTaken.length === 3) return;
    if (hasDuplicate(tokensTaken)) return;

    // handles same color pickup with 2 tokens
    if (tokensTaken.includes(color) && tokensTaken.length > 1) {
      console.log('already grabbed two different colors');
      return;
    }

    const chosenToken = bank[color];
    if (chosenToken > 1 && currentPlayer) {
      updateBank({ ...bank, [color]: chosenToken - 1 });
      const newAmt = currentPlayer.tokens[color] + 1;
      updatePlayerTokens(color, newAmt);
      setTokensTaken([...tokensTaken, color]);
    }
  };

  if (!bank) return null;

  return (
    <>
      <div className={styles.bankContainer}>
        <div>
          <img
            src={FireIcon}
            className={styles.fireIcon}
            onClick={() => handleClick('red')}
          />
          <span>{bank['red']}</span>
        </div>
        <div>
          <img
            src={GrassIcon}
            className={styles.grassIcon}
            onClick={() => handleClick('green')}
          />
          <span>{bank['green']}</span>
        </div>
        <div>
          <img
            src={WaterIcon}
            className={styles.waterIcon}
            onClick={() => handleClick('blue')}
          />
          <span>{bank['blue']}</span>
        </div>
        <div>
          <img
            src={GroundIcon}
            className={styles.groundIcon}
            onClick={() => handleClick('black')}
          />
          <span>{bank['black']}</span>
        </div>
        <div>
          <img
            src={NormalIcon}
            className={styles.normalIcon}
            onClick={() => handleClick('white')}
          />
          <span>{bank['white']}</span>
        </div>
        <div>
          <img
            src={DragonIcon}
            className={styles.dragonIcon}
            onClick={() => handleClick('gold')}
          />
          <span>{bank['gold']}</span>
        </div>
        <div>
          TAKEN:{' '}
          {tokensTaken.map((token, i) => (
            <div key={`${token}_${i}`}>{token}</div>
          ))}
        </div>
      </div>
    </>
  );
}
