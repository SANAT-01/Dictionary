import axios from "axios";

const API_URL = "https://66a3325444aa6370458052df.mockapi.io/words";

// Different functions to perform adding, retrieving, modifying, deleting the word and their definitions
export const getWordDefinition = async (word: string) => {
  const response = await axios.get(`${API_URL}?search=${word}`);
  return response.data;
};

export const addWordDefinition = async (word: string, definition: string) => {
  const response = await axios.post(API_URL, { word, definition });
  return response.data;
};

export const editWordDefinition = async (id: string, definition: string) => {
  const response = await axios.put(`${API_URL}/${id}`, { definition });
  return response.data;
};

export const deleteWord = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
