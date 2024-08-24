import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const HISTORY_KEY = "history";
export default function historyService() {
  const { getItem, setItem } = useAsyncStorage(HISTORY_KEY, []);

  const getHistoryBySlug = async (slug) => {
    const storedHistory = await getItem();
    let history = storedHistory ? JSON.parse(storedHistory) : [];
    return history.find((item) => item.slug === slug);
  };

  const addToHistory = async (movie) => {
    try {
      const storedHistory = await getItem();
      let updatedHistory = storedHistory ? JSON.parse(storedHistory) : [];

      let itemHistory = updatedHistory.find((item) => item.slug === movie.slug);

      if (itemHistory) {
        itemHistory.eps = movie.eps;
        itemHistory.position = movie.position;
      } else {
        updatedHistory.push(movie);
      }

      await setItem(JSON.stringify(updatedHistory));
    } catch (error) {
      console.log("Error adding to History:", error);
    }
  };

  return {
    getHistoryBySlug,
    addToHistory,
  };
}
