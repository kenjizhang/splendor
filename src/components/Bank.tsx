import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (currentPlayer?.name) {
      setTokensTaken([]);
    }
  }, [currentPlayer?.name]);

  const handleClick = (color: string) => {
    // grabbed max tokens
    if (tokensTaken.length === 3) return;
    // disable pickup for two of same color
    if (hasDuplicate(tokensTaken)) return;
    // handles same color pickup with 2 tokens
    if (tokensTaken.includes(color) && tokensTaken.length > 1) {
      console.log('already grabbed two different colors');
      return;
    }
    // handle same color pickup with insufficient bank tokens
    if (tokensTaken.includes(color) && bank[color] < 3) {
      console.log('cannot grab two of the same tokens with remaining bank');
      return;
    }

    const chosenToken = bank[color];
    if (chosenToken > 0 && currentPlayer) {
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
          <span>{bank['red']}</span>
          <img
            src={FireIcon}
            className={styles.fireIcon}
            onClick={() => handleClick('red')}
          />
        </div>
        <div>
          <span>{bank['green']}</span>
          <img
            src={GrassIcon}
            className={styles.grassIcon}
            onClick={() => handleClick('green')}
          />
        </div>
        <div>
          <span>{bank['blue']}</span>
          <img
            src={WaterIcon}
            className={styles.waterIcon}
            onClick={() => handleClick('blue')}
          />
        </div>
        <div>
          <span>{bank['black']}</span>
          <img
            src={GroundIcon}
            className={styles.groundIcon}
            onClick={() => handleClick('black')}
          />
        </div>
        <div>
          <span>{bank['white']}</span>
          <img
            src={NormalIcon}
            className={styles.normalIcon}
            onClick={() => handleClick('white')}
          />
        </div>
        <div>
          <span>{bank['gold']}</span>
          <img
            src={DragonIcon}
            className={styles.dragonIcon}
            onClick={() => handleClick('gold')}
          />
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
