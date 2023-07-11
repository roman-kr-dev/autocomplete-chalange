import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import AutoComplete from "../components/AutoComplete";
import { useState } from "react";

const Home: NextPage = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");
  return (
    <div className={styles.container}>
      <AutoComplete setSelectedSuggestion={setSelectedSuggestion} />
      <div className={styles.userSelection}>{selectedSuggestion}</div>
    </div>
  );
};

export default Home;
