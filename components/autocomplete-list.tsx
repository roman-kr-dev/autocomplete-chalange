import React from 'react';
import { AutocompleteListItem } from './autocomplete-list-item';
import styles from '../styles/Autocomplete.module.css';
import { useAutocompleteContext } from '../model';

export const AutoCompleteList: React.FC = () => {
  const { state: { items, error }} = useAutocompleteContext();
  if (error) return <pre>{error.message}</pre>
  if (items.length === 0) return null;

  return (
    <ul className={styles.autocompleteBox}>
      {
        items.map((item) => (
          <AutocompleteListItem key={item} item={item} />
        ))
      }
    </ul>
  );
};
