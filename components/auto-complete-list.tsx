import React from 'react';
import styles from '../styles/Autocomplete.module.css';

interface AutoCompleteListProps {
  items: string[];
  error: Error | null;
  itemOnClick(item: string): void;
}

export const AutoCompleteList: React.FC<AutoCompleteListProps> = ({ items, error, itemOnClick }) => {

  if (error) return <pre>{error.message}</pre>
  if (items.length === 0) return null;

  const handleItemClick = (item: string) => () => {
    itemOnClick(item);
  }

  return (
    <ul className={styles.autocompleteBox}>
      {
        items.map((item) => (
          <li className={styles.autocompleteBoxItems} key={item} onClick={handleItemClick(item)}>{item}</li>
        ))
      }
    </ul>
  );
};
