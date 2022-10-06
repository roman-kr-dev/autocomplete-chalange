import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import styles from '../styles/Autocomplete.module.css';

// /api/autocomplete?q=a

let debounceSearch: any = null
function abortableFetch(request: any, opts: any = {}) {
  const controller = new AbortController();
  const signal = controller.signal;

  return {
    abort: () => controller.abort(),
    ready: () => fetch(request, { ...opts, signal }).then(res => res.json())
  };
}
let fetchRequest: any = null

const AutoComplete = ({ onSelect }: any) => {
  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState([]);

  const searchInputRef: any = useRef(null);

  const handleSearchChange = useCallback((e: any) => {
    const q = e.target.value;
    setSearchValue(q);
    clearTimeout(debounceSearch);
    if (!q) return;
    debounceSearch = setTimeout(() => {
      loadData(q);
    }, 600);
  }, [searchValue]);

  const handleItemClick = useCallback((item: string) => (e: any) => {
    onSelect(item);
    setSearchValue(item);
    setResult([]);
    if (searchInputRef?.current) {
      searchInputRef.current.focus();
    }
  }, [onSelect]);

  async function loadData(q: string) {
    if (fetchRequest?.abort) {
      fetchRequest.abort();
    }
    try {
      fetchRequest = abortableFetch(`/api/autocomplete?delay=1&q=${q}`);
      const { items } = await fetchRequest.ready();
      setResult(items);
    } catch (e) {

    }
    fetchRequest = null;
  }

  useEffect(() => {
    return () => clearTimeout(debounceSearch);
  }, []);

  return (
    <div className={styles.container}>
      <h1>AutoComplete</h1>
      <div className={styles.inputContainer}>
        <input ref={searchInputRef} type="text" value={searchValue} onChange={handleSearchChange} />
        <ul>
          {
            result.map((item, i) => (
              <li key={item} onClick={handleItemClick(item)}>{item}</li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default AutoComplete
