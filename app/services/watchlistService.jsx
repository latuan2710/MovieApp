import AsyncStorage from "@react-native-async-storage/async-storage";

const WATCHLIST_KEY = "watchlist";

const getFromLocal = async () => {
  const storedWatchlist = await AsyncStorage.getItem(WATCHLIST_KEY);

  return storedWatchlist ? JSON.parse(storedWatchlist) : null;
};

export const isContainMovie = async (movie) => {
  const storedWatchlist = await getFromLocal();

  if (storedWatchlist) {
    return watchlist.includes(movie);
  }

  return false;
};

export const addToWatchlist = async (slug) => {
    
};
