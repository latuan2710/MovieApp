import Screen from "@components/Screen";
import VideoPlayer from "@components/VideoPlayer";
import { MaterialIcons } from "@expo/vector-icons";
import useFetchFilm from "@hooks/useFetchFilm";

import useHistory from "@hooks/useHistory";
import useWatchlist from "@hooks/useWatchlist";
import { useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function DetailScreen() {
  const route = useRoute();
  const { slug } = route.params;

  const { addToWatchlist, removeFromWatchlist, isContainMovie } =
    useWatchlist();
  const { data, loading } = useFetchFilm(slug);

  const { addToHistory, getHistoryBySlug } = useHistory();

  const positionRef = useRef(0);
  const indexRef = useRef(0);
  const episodes = useRef([]);
  const film = useRef({});

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded((pre) => !pre);
  };

  useEffect(() => {
    if (data) {
      film.current = data.movie;
      episodes.current = data.episodes[0].server_data;
    }
  }, [data]);

  useEffect(() => {
    indexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    let movieHistory = getHistoryBySlug(slug);
    console.log("movieHistory", movieHistory);
    // setCurrentIndex(movieHistory);

    return async () => {
      await addToHistory({
        slug: slug,
        eps: indexRef.current,
        position: positionRef.current,
      });
    };
  }, []);

  if (loading) {
    return (
      <Screen>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Screen>
    );
  }

  if (!data || !film.current) {
    return (
      <Screen>
        <View style={styles.centered}>
          <Text style={styles.text}>No film data available</Text>
        </View>
      </Screen>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView>
        <VideoPlayer
          videoLink={episodes.current[currentIndex].link_m3u8}
          totalEps={episodes.current.length}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          positionRef={positionRef}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <View style={styles.section}>
              <Text style={styles.title}>
                {`${film.current.name} - Episode ${currentIndex + 1}`}
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.greyText}>
                {`${episodes.current.length}/${film.current.episode_total}`}
              </Text>
            </View>
          </View>
          <View style={{ width: 30 }}>
            {isContainMovie(film.current.slug) ? (
              <TouchableOpacity
                onPress={() => removeFromWatchlist(film.current.slug)}
              >
                <MaterialIcons name={"star"} size={30} color="#ff0" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => addToWatchlist(film.current.slug)}
              >
                <MaterialIcons name={"star-outline"} size={30} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.section}>
          <TouchableOpacity onPress={toggleText}>
            <Text
              style={styles.text}
              numberOfLines={isExpanded ? undefined : 3}
              ellipsizeMode="tail"
            >
              {film.current.content}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.greyText}>Category: </Text>
            <Text style={styles.greyText}>
              {film.current.category.map((ele) => ele.name).join(", ")}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.greyText}>Actors: </Text>
            <Text style={styles.greyText}>{film.current.actor.join(", ")}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.greyText}>Director: </Text>
            <Text style={styles.greyText}>{film.current.director[0]}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.greyText}>Country: </Text>
            <Text style={styles.greyText}>{film.current.country[0].name}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: "bold",
                  paddingBottom: 5,
                  borderBottomColor: "#ED1B24",
                  borderBottomWidth: 3,
                },
              ]}
            >
              Episodes
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {episodes.current.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentIndex(index)}
                style={[
                  styles.button,
                  currentIndex === index && styles.selectedButton,
                ]}
              >
                <Text style={styles.buttonText}>{index + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    margin: 10,
    marginTop: 0,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  greyText: {
    color: "gray",
    fontSize: 18,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  button: {
    width: 45,
    height: 45,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444",
    borderRadius: 5,
  },
  selectedButton: { backgroundColor: "#ED1B24" },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
