import useFetchListFilms from "@hooks/useFetchListFilms";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import MovieItem from "./MovieItem";

export default function FilmList({ api }) {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { data, loading } = useFetchListFilms(api, page);

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

  const footerComponent = useMemo(
    () => loading && <ActivityIndicator size="large" color="#0000ff" />,
    [loading]
  );

  return (
    <FlatList
      data={films}
      renderItem={({ item }) => <MovieItem slug={item.slug} />}
      numColumns={3}
      keyExtractor={(item) => item.slug}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={footerComponent}
    />
  );
}
