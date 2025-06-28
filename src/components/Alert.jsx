import React from 'react';
import styles from './Alert.module.css';

const Alert = ({ type, message }) => {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <p>{message}</p>
    </div>
  );
};

export default Alert;