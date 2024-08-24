import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const WATCHLIST_KEY = "watchlist";

const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const isContainMovie = (movie) => {
    return watchlist.includes(movie);
  };

  const loadWatchlist = async () => {
    try {
      const storedWatchlist = await AsyncStorage.getItem(WATCHLIST_KEY);
      if (storedWatchlist) {
        setWatchlist(JSON.parse(storedWatchlist));
      }
    } catch (error) {
      console.log("Error loading watchlist:", error);
    }
  };
  
  const addToWatchlist = async (movie) => {
    try {
      if (isContainMovie(movie)) {
        Alert("Movie already in watchlist");
      }

      const updatedWatchlist = [...watchlist, movie];
      setWatchlist(updatedWatchlist);

      await AsyncStorage.setItem(
        WATCHLIST_KEY,
        JSON.stringify(updatedWatchlist)
      );
    } catch (error) {
      console.log("Error adding to watchlist:", error);
    }
  };

  const removeFromWatchlist = async (movie) => {
    try {
      const updatedWatchlist = watchlist.filter((item) => item !== movie);
      setWatchlist(updatedWatchlist);
      await AsyncStorage.setItem(
        WATCHLIST_KEY,
        JSON.stringify(updatedWatchlist)
      );
    } catch (error) {
      console.log("Error removing from watchlist:", error);
    }
  };

  const clearWatchlist = async () => {
    try {
      await AsyncStorage.removeItem(WATCHLIST_KEY);
      setWatchlist([]);
    } catch (error) {
      console.log("Error clearing watchlist:", error);
    }
  };

  return {
    isContainMovie,
    loadWatchlist,
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    clearWatchlist,
  };
};

export default useWatchlist;
