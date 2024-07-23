// src/services/WordService.ts
import axios from "axios";

const API_URL = "https://669f5faab132e2c136fd98de.mockapi.io/"; // Replace with your actual MockAPI endpoint

export const getWordDefinition = async (word: string) => {
  const response = await axios.get(`${API_URL}/words?search=${word}`);
  return response.data;
};