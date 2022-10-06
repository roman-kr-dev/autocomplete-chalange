import type { NextPage } from 'next'
import styles from '../styles/Home.module.css';
import AutoComplete from '../components/AutoComplete';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <AutoComplete />
      <div className={styles.userSelection}>USER SELECTION HERE</div>
    </div>
  )
}

export default Home
