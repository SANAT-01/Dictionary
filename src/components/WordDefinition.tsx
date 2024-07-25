import React, { useState } from "react";
import Select from "react-select";
import { getWordDefinition } from "../services/wordService";

const words = await getWordDefinition("");

const WordDefinition: React.FC = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = words.map((word: object) => ({
    value: word.word,
    label: word.word,
  }));

  const fetchDefinition = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWordDefinition(word);
      console.log(data);
      if (data.length == 100) {
        setDefinition("");
      } else if (data.length > 0) {
        setDefinition(data[0].definition);
      } else {
        setDefinition("Empty Definition :)");
      }
    } catch (err) {
      setDefinition("");
      setError("Definition not added in the MockAPI ;)");
    }
    setLoading(false);
  };

  const handleSelectChange = (selectedOption: object) => {
    setWord(selectedOption ? selectedOption.value : "");
  };

  const handleSearch = () => {
    fetchDefinition();
  };

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
    </div>
  );
};

export default WordDefinition;
