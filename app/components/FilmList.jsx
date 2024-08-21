import useFetchListFilms from "@hooks/useFetchListFilms";
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
  View,
} from "react-native";

export default function FilmList({ api }) {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { data, loading } = useFetchListFilms(api, page);
  const navigation = useNavigation();

  useEffect(() => {
    if (data && data.items) {
      setFilms((prevFilms) => [...prevFilms, ...data.items]);

      const { currentPage, totalItems, totalItemsPerPage } =
        data.params.pagination;

      let totalPages = Math.ceil(totalItems / totalItemsPerPage);
      setHasMore(currentPage < totalPages);
    }
  }, [data]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePress = (item) => {
    navigation.navigate("Detail", { slug: item.slug });
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.pressable} onPress={() => handlePress(item)}>
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
      onEndReachedThreshold={0.5}
      ListFooterComponent={footerComponent}
    />
  );
}

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  pressable: {
    padding: 5,
    width: width / 3,
    height: (width / 16) * 9,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
