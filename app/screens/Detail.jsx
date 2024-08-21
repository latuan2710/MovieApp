import Screen from "@components/Screen";
import VideoPlayerScreen from "@components/VideoPlayer";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DetailScreen() {
  const [loading, setLoading] = useState(false);
  const [film, setFilm] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const fetchFilm = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://ophim1.com/phim/${route.params.slug}`
      );
      const data = response.data;

      setFilm(data.movie);
      setEpisodes(data.episodes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilm();
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

  if (!film) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>No film data available</Text>
      </View>
    );
  }

  return (
    <Screen>
      <ScrollView>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: film.thumb_url }}
            style={styles.centered}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["transparent", "black"]}
              start={[0, 0]}
              end={[0, 1]}
              style={styles.gradientBackground}
            >
              <View style={styles.centered}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.replace("Video Player");
                  }}
                >
                  <Entypo name="controller-play" size={25} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.text}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.text}>+ Add to Watchlist</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.text}>{film.content}</Text>
          </View>
        </View>
        <View>
          <VideoPlayerScreen />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height / 2,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    backgroundColor: "#ED1B24",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    marginTop: "-30%",
    paddingHorizontal: 20,
  },
  actionsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  downloadButton: {
    borderColor: "#ED1B24",
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  descriptionContainer: {
    marginTop: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
