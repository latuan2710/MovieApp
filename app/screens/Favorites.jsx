import MovieItem from "@components/MovieItem";
import Screen from "@components/Screen";
import useWatchlist from "hooks/useWatchlist";
import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

export default function FavoritesScreen() {
  const { watchlist, loadWatchlist } = useWatchlist();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadWatchlist();
    setRefreshing(false);
  }, [loadWatchlist]);

  return (
    <Screen>
      <FlatList
        numColumns={3}
        data={watchlist}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <MovieItem slug={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={
          watchlist.length === 0 && styles.contentContainer
        }
        ListEmptyComponent={
          <Text style={styles.itemText}>No items in your watchlist</Text>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    color: "white",
    fontSize: 16,
  },
});
