import React, { useState } from "react";
import { addWordDefinition } from "../services/wordService";

const AddWord: React.FC = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");

  const handleAddWord = async () => {
    if (word && definition) {
      await addWordDefinition(word, definition);
      setWord("");
      setDefinition("");
    }
  };

  return (
    <div>
      <h2>Add New Word</h2>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter new word"
      />
      <input
        type="text"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
        placeholder="Enter it's definition"
      />
      <button onClick={handleAddWord}>Add This Word</button>
    </div>
  );
};

export default AddWord;
