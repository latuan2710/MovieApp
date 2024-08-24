import AsyncStorage from "@react-native-async-storage/async-storage";

const WATCHLIST_KEY = "watchlist";

export const getFromLocal = async () => {
  const storedWatchlist = await AsyncStorage.getItem(WATCHLIST_KEY);

  return storedWatchlist ? JSON.parse(storedWatchlist) : null;
};

const save = async (data) => {
  await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(data));
};

export const isContainMovie = async (movie) => {
  const storedWatchlist = await getFromLocal();

  if (storedWatchlist) {
    return watchlist.includes(movie);
  }

  return false;
};

export const addToWatchlist = async (slug) => {
  const updatedWatchlist = [...watchlist, slug];

  await save(updatedWatchlist);
};

export const removeFromWatchlist = async (slug) => {
  try {
    const updatedWatchlist = watchlist.filter((item) => item !== slug);
    await save(updatedWatchlist);
  } catch (error) {
    console.log("Error removing from watchlist:", error);
  }
};
