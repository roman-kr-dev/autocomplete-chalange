import React from 'react';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css';
import AutoComplete from '../components/AutoComplete';
import { AutoCompleteProvider } from '../model';
import { UserSelection } from '../components/user-selection';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <AutoCompleteProvider>
        <AutoComplete />
        <UserSelection />
      </AutoCompleteProvider>
    </div>
  )
}

export default Home
