import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const HISTORY_KEY = "history";

const useHistory = () => {
  const [history, setHistory] = useState([]);
  console.log("history render");

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(HISTORY_KEY);
        console.log("load ", storedHistory);

        setHistory(storedHistory ? JSON.parse(storedHistory) : history);
      } catch (error) {
        console.log("Error loading History:", error);
        setHistory([]);
      }
    };
    loadHistory();
  }, []);

  const getHistoryBySlug = (slug) => {
    console.log(
      "getHistoryBySlug: ",
      history.find((item) => item.slug === slug)
    );
    return history.find((item) => item.slug === slug);
  };

  const addToHistory = async (movie) => {
    try {
      let updatedHistory = [...history];
      // let updatedHistory = [
      //   { eps: 0, position: 77654, slug: "khong-khuat-phuc" },
      // ];

      console.log("updatedHistory", updatedHistory);
      let itemHistory = updatedHistory.find((item) => item.slug === movie.slug);
      console.log("Pre-history: ", history, movie);

      if (itemHistory) {
        itemHistory.eps = movie.slug;
        itemHistory.position = movie.position;
      } else {
        updatedHistory.push(movie);
      }
      setHistory(updatedHistory);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.log("Error adding to History:", error);
    }
  };

  const removeFromHistory = async (slug) => {
    try {
      const updatedHistory = history.filter((item) => item.slug !== slug);
      setHistory(updatedHistory);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.log("Error removing from History:", error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
      setHistory([]);
    } catch (error) {
      console.log("Error clearing History:", error);
    }
  };

  return {
    history,
    getHistoryBySlug,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
};

export default useHistory;
