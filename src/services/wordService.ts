// src/services/wordService.ts
import axios from "axios";

const API_URL = "https://669f5faab132e2c136fd98de.mockapi.io/words";

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
