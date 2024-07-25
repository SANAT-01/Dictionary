// src/components/WordDefinition.tsx
import React, { useState } from "react";
import Select from "react-select";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getWordDefinition,
  editWordDefinition,
  deleteWord,
} from "../services/wordService";
import AddWord from "./AddWord";

const WordDefinition: React.FC = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const {
    data: wordsData,
    isLoading: wordsLoading,
    error: wordsError,
  } = useQuery("words", () => getWordDefinition(""));

  const mutation = useMutation(
    (newWord: { word: string; definition: string }) =>
      addWordDefinition(newWord.word, newWord.definition),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("words");
      },
    }
  );

  const handleSelectChange = (selectedOption: any) => {
    setSelectedWord(selectedOption);
    setWord(selectedOption ? selectedOption.value : "");
  };

  const fetchDefinition = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWordDefinition(word);
      if (data.length === 0) {
        setDefinition("No definition found.");
      } else {
        setDefinition(data[0].definition);
      }
    } catch (err) {
      setError("Error fetching definition.");
    }
    setLoading(false);
  };

  const handleSearch = () => {
    fetchDefinition();
  };

  const handleEditWord = async () => {
    if (selectedWord) {
      await editWordDefinition(selectedWord.id, definition || "");
      queryClient.invalidateQueries("words");
      setSelectedWord(null);
      setWord("");
      setDefinition("");
    }
  };

  const handleDeleteWord = async () => {
    if (selectedWord) {
      await deleteWord(selectedWord.id);
      queryClient.invalidateQueries("words");
      setSelectedWord(null);
      setWord("");
      setDefinition("");
    }
  };

  if (wordsLoading) return <div>Loading words...</div>;
  if (wordsError) return <div>Error loading words</div>;

  const options = wordsData
    ? wordsData.map((word: any) => ({
        value: word.word,
        label: word.word,
        id: word.id,
      }))
    : [];

  return (
    <div>
      <h1>Dictionary App</h1>
      <Select
        options={options}
        onChange={handleSelectChange}
        isClearable
        placeholder="Select a word"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {definition && <p>Definition: {definition}</p>}
      {selectedWord && (
        <div>
          <h2>Edit Word</h2>
          <input
            type="text"
            value={definition || ""}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="Edit definition"
          />
          <button onClick={handleEditWord}>Edit</button>
          <button onClick={handleDeleteWord}>Delete</button>
        </div>
      )}
      <AddWord />
    </div>
  );
};

export default WordDefinition;
