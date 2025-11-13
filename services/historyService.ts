import { HistoryItem, AnalysisResult } from '../types';

const HISTORY_KEY = 'plant-disease-history';

export const getHistory = (): HistoryItem[] => {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error("Failed to parse history from localStorage", error);
    localStorage.removeItem(HISTORY_KEY);
    return [];
  }
};

interface AddToHistoryPayload {
  imageUrl: string;
  result: AnalysisResult;
}

export const addToHistory = (item: AddToHistoryPayload): void => {
  try {
    const history = getHistory();
    const newItem: HistoryItem = {
      ...item,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    // Prepend to show the latest first and limit history size
    const newHistory = [newItem, ...history].slice(0, 50); 
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error("Failed to add item to history in localStorage", error);
  }
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear history from localStorage", error);
  }
};
