import React, { useState, useCallback } from "react";
import { Text, View, FlatList, RefreshControl, StyleSheet } from "react-native";
import Screen from "@components/Screen";
import useWatchlist from "hooks/useWatchlist";

export default function FavoritesScreen() {
  const { watchlist, loadWatchlist } = useWatchlist();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadWatchlist();
    setRefreshing(false);
  }, [loadWatchlist]);

  const renderItem = ({ item }) => <Text style={styles.itemText}>{item}</Text>;

  return (
    <Screen>
      <FlatList
        data={watchlist}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
    marginVertical: 8,
  },
});
