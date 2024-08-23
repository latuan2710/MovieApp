import Screen from "@components/Screen";
import VideoPlayer from "@components/VideoPlayer";
import { MaterialIcons } from "@expo/vector-icons";
import useFetchFilm from "@hooks/useFetchFilm";
import useWatchlist from "@hooks/useWatchlist";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DetailScreen() {
  const route = useRoute();
  const { slug } = route.params;

  const { addToWatchlist, removeFromWatchlist, isContainMovie } =
    useWatchlist();
  const { data, loading } = useFetchFilm(slug);

  const [episodes, setEpisodes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [film, setFilm] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded((pre) => !pre);
  };

  useEffect(() => {
    if (data) {
      setFilm(data.movie);
      setEpisodes(data.episodes[0].server_data);
    }
  }, [data]);

  if (loading) {
    return (
      <Screen>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Screen>
    );
  }

  if (!data || !film) {
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
        <VideoPlayer videoLink={episodes[currentIndex].link_m3u8} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <View style={styles.section}>
              <Text style={styles.title}>
                {`${film.name} - Episode ${currentIndex + 1}`}
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.greyText}>
                {`${episodes.length}/${film.episode_total}`}
              </Text>
            </View>
          </View>
          <View>
            {isContainMovie(film.slug) ? (
              <TouchableOpacity onPress={() => removeFromWatchlist(film.slug)}>
                <MaterialIcons name={"star"} size={30} color="#ff0" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => addToWatchlist(film.slug)}>
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
              {film.content}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.greyText}>Category: </Text>
            <Text style={styles.greyText}>
              {film.category.map((ele) => ele.name).join(", ")}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.greyText}>Actors: </Text>
            <Text style={styles.greyText}>{film.actor.join(", ")}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.greyText}>Director: </Text>
            <Text style={styles.greyText}>{film.director[0]}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.greyText}>Country: </Text>
            <Text style={styles.greyText}>{film.country[0].name}</Text>
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
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {episodes.map((_, index) => (
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
const { width } = Dimensions.get("screen");
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
    width: width / 9,
    height: width / 9,
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
