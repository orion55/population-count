import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

const DisableBtn = (props) => {
  const { onDisable } = props;
  return (
    <button className={styles.disbtn} onClick={onDisable}>
      <FontAwesomeIcon icon={faLock} className={styles.disbtn__icon} />
    </button>
  );
};

export default DisableBtn;
