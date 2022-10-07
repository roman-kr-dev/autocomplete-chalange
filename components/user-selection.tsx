import React from 'react';
import { useAutocompleteContext } from '../model';
import styles from '../styles/Home.module.css';


export const UserSelection: React.FC = () => {
  const { state: { userSelection } } = useAutocompleteContext();

  if (!userSelection) return null;
  return (
    <div className={styles.userSelection}>USER SELECTION HERE: {userSelection as string}</div>
  )
}
