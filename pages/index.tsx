import React from 'react';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css';
import AutoComplete from '../components/AutoComplete';

const Home: NextPage = () => {
  const [userSelection, setUserSelection] = React.useState<string>('');
  const onItemClick = React.useCallback((item: string) => {
    setUserSelection(item);
  }, []);

  return (
    <div className={styles.container}>
      <AutoComplete onItemClick={onItemClick} />
      <div className={styles.userSelection}>USER SELECTION HERE {userSelection || ''}</div>
    </div>
  )
}

export default Home
