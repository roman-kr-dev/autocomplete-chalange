import styles from '../styles/Autocomplete.module.css';
import React from 'react';
import { AutoCompleteList } from './autocomplete-list';
import {
  setItemsAction,
  useAutocompleteContext,
  setValueAction,
  useDebouncedValue,
  setErrorAction,
} from '../model';

const AutoComplete: React.FC = () => {
  const { state: { value }, dispatch } = useAutocompleteContext();
  const abortRef = React.useRef<null | AbortController>();
  const debouncedValue = useDebouncedValue(value, 250);

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setValueAction(dispatch, target.value);
  }

  React.useEffect(() => {
    if (!debouncedValue) {
      setItemsAction(dispatch, { items: [] });
      return
    };

    if (abortRef.current) {
      abortRef.current.abort();
    }

    abortRef.current = new AbortController();

    fetch(
      `/api/autocomplete?q=${encodeURIComponent(debouncedValue)}&delay=1`,
      { signal: abortRef.current.signal },
    )
      .then(data => data.json())
      .then(({ items }: { items: string[] }) => {
        setItemsAction(dispatch, {
          items,
          error: null,
        });
      })
      .catch((error: any) => {
        if (error.name !== 'AbortError') {
          setErrorAction(dispatch, error)
        }
      });

  }, [debouncedValue, dispatch])

  return (
    <div className={styles.container}>
      <h1>AutoComplete</h1>
      <input
        className={styles.input}
        type="text"
        name="search"
        onChange={handleChange}
        value={value}
      />
      <AutoCompleteList />
    </div>
  )
}

export default AutoComplete
