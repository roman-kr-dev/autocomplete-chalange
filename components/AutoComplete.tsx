import styles from '../styles/Autocomplete.module.css';
import React from 'react';
import { AutoCompleteList } from './auto-complete-list';

interface AutoCompleteProp {
  onItemClick(item: string): void;
}

const AutoComplete: React.FC<AutoCompleteProp> = ({ onItemClick }) => {
  const abortRef = React.useRef<null | AbortController>();
  const [inputValue, setInputValue] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState<Error | null>(null)
  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(target.value);
  }

  React.useEffect(() => {
    if (!inputValue) {
      setItems([]);
      return
    };

    if (abortRef.current) {
      abortRef.current.abort();
    }

    abortRef.current = new AbortController();

    fetch(
      `/api/autocomplete?q=${encodeURIComponent(inputValue)}&delay=1`,
      { signal: abortRef.current.signal },
    )
      .then(data => data.json())
      .then(({ items }) => {
        setError(null);
        setItems(items)
      })
      .catch((error: any) => {
        if (error.name !== 'AbortError') {
          setError(error);
        }
      })

  }, [inputValue])

  const itemOnClick = React.useCallback((item: string) => {
    setItems([])
    onItemClick(item);
  }, [onItemClick])

  return (
    <div className={styles.container}>
      <h1>AutoComplete</h1>
      <input
        className={styles.input}
        type="text"
        name="search"
        onChange={handleChange}
        value={inputValue}
      />
      <AutoCompleteList error={error} items={items} itemOnClick={itemOnClick} />
    </div>
  )
}

export default AutoComplete
