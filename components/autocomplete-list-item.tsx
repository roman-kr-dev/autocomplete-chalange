import React from 'react';
import { useAutocompleteContext, setUserSelection } from '../model';
import styles from '../styles/Autocomplete.module.css';

interface AutocompleteListItem {
  item: string;
}

export const AutocompleteListItem = React.memo(({ item }: AutocompleteListItem)  => {
  const { dispatch } = useAutocompleteContext();
  const handleItemClick = () => setUserSelection(dispatch, item);

  return (
    <li
      className={styles.autocompleteBoxItems}
      onClick={handleItemClick}
    >
      {item}
    </li>
  );
});
AutocompleteListItem.displayName = 'AutocompleteListItem';
