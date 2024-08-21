import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View
} from "react-native";

export default function FilmList({ api }) {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();

  const fetchFilms = useCallback(
    async (pageNum) => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `https://ophim1.com/v1/api/${api}page=${pageNum}`
        );
        const newFilms = response.data.items;

        setFilms((prevFilms) => [...prevFilms, ...newFilms]);

        const { currentPage, totalItems, totalItemsPerPage } =
          response.data.params.pagination;

        let totalPages = Math.round(totalItems / totalItemsPerPage);

        setHasMore(currentPage < totalPages);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    fetchFilms(page);
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchFilms(page);
    }
  };

  const handlePress = (item) => {
    navigation.navigate("Detail", { slug: item.slug });
  };

  const renderItem = useCallback(
    ({ item }) => <Item item={item} onPress={handlePress} />,
    [handlePress]
  );

  const footerComponent = useMemo(
    () => loading && <ActivityIndicator size="large" color="#0000ff" />,
    [loading]
  );

  return (
    <FlatList
      data={films}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={(item) => item.slug}
      onEndReached={loadMore}
      onEndReachedThreshold={1}
      ListFooterComponent={footerComponent}
    />
  );
}

const Item = React.memo(({ item, onPress }) => (
  <Pressable style={styles.pressable} onPress={() => onPress(item)}>
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: `https://img.ophim.live/uploads/movies/${item.thumb_url}`,
        }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  </Pressable>
));

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  pressable: {
    width: width / 3,
    padding: 8,
    height: (width / 16) * 9,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
