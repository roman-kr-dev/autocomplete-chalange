import type { NextPage } from 'next'
import { useCallback, useState } from 'react';
import styles from '../styles/Home.module.css';
import AutoComplete from '../components/AutoComplete';

const Home: NextPage = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const handleSelectedItem = useCallback((selectedItem: string) => {
    setSelectedItem(selectedItem);
  }, []);
  return (
    <div className={styles.container}>
      <AutoComplete onSelect={handleSelectedItem} />
      <div className={styles.userSelection}>USER SELECTION HERE {selectedItem && `: ${selectedItem}`}</div>
    </div>
  )
}

export default Home
