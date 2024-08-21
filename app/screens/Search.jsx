import React, { useState } from "react";
import FilmList from "@components/FilmList";
import Screen from "@components/Screen";
import { View, StyleSheet, TextInput } from "react-native";
import { Searchbar } from "react-native-paper";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleSearchSubmit = () => {
    console.log(searchText);
    setSearchQuery(searchText);
  };

  return (
    <Screen>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onTouchStart={()=>setSearchQuery("")}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchSubmit}
          value={searchText}
        />
      </View>
      {searchQuery && <FilmList api={`tim-kiem?keyword=${searchQuery}&`} />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 50,
    marginHorizontal: 10,
  },
});
