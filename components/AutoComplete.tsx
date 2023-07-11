import { useEffect, useRef, useState } from "react";
import styles from "../styles/Autocomplete.module.css";
import axios, { CancelToken, CancelTokenSource } from "axios";

const fetchFromAPI = async (input: string, cancelToken: CancelToken) =>
  axios
    .get(`/api/autocomplete?q=${input}&delay=1`, { cancelToken })
    .then(function (response) {
      const {
        data: { items },
      } = response;
      return items;
    })
    .catch(function (error) {
      console.log(error);
      return [];
    });

interface AutoCompleteProps {
  setSelectedSuggestion: (suggestion: string) => void;
}
const AutoComplete = ({ setSelectedSuggestion }: AutoCompleteProps) => {
  const axiosCancelSource = useRef<CancelTokenSource | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const [txt, setTxt] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState<number>(-1);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const debounceInput = (inputText: string) => {
    // Clear the old timeout
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Save the new timeout in the ref
    debounceRef.current = setTimeout(() => {
      // If there's an ongoing request, cancel it
      if (axiosCancelSource.current) {
        axiosCancelSource.current.cancel(
          "New request incoming, cancelling old request"
        );
      }

      // Create a new cancel source for the new request
      axiosCancelSource.current = axios.CancelToken.source();

      fetchFromAPI(inputText, axiosCancelSource.current.token)
        .then((res) => {
          setSuggestions(res);
        })
        .catch((e) => {
          if (axios.isCancel(e)) {
            console.log("Request cancelled", e.message);
          } else {
            console.log(e);
            setSuggestions([]);
          }
        });
    }, 300);
  };

  const getSuggestions = (inputText: string) => {
    setTxt(inputText);
    if (inputText === "" || !inputText) {
      setSuggestions([]);
      return;
    }

    debounceInput(inputText);
  };

  const Suggestions = () => (
    <ul>
      {suggestions.map((suggestion: string, i: number) => (
        <li
          key={i}
          style={{ background: i === suggestionIndex ? "#aaa" : "#ccc" }}
          onClick={() => {
            setSelectedSuggestion(suggestion);
            inputRef.current?.focus();
            setTxt(suggestion);
            setSuggestions([]);
          }}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 38) {
      // Up
      if (suggestionIndex === 0) return;

      setSuggestionIndex(suggestionIndex - 1);
    }
    if (e.keyCode === 40) {
      // Down
      if (suggestionIndex === suggestions.length - 1) return;

      setSuggestionIndex(suggestionIndex + 1);
    }
    if (e.keyCode === 13) {
      // Enter
      setSelectedSuggestion(suggestions[suggestionIndex]);
      setTxt(suggestions[suggestionIndex]);
      setSuggestions([]);
    }
  };

  return (
    <div className={styles.container}>
      <h1>AutoComplete</h1>
      <input
        type="text"
        value={txt}
        onChange={(e) => {
          getSuggestions(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      {Suggestions()}
    </div>
  );
};

export default AutoComplete;
