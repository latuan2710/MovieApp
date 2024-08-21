import Screen from "@components/Screen";
import VideoPlayerScreen from "@components/VideoPlayer";
import useFetchFilm from "@hooks/useFetchFilm";
import useWatchlist from "@hooks/useWatchlist";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { slug } = route.params;

  const { addToWatchlist, removeFromWatchlist, isContainMovie } =
    useWatchlist();
  const { data, loading } = useFetchFilm(slug);

  const [activeTab, setActiveTab] = useState(0);
  // const [episodes, setEpisodes] = useState([]);
  const [film, setFilm] = useState(null);

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    if (data) {
      setFilm(data.movie);
      // setEpisodes(data.episodes);
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

  const tabs = ["Trailer", "Cast"];

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
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
            {isContainMovie(film.slug) ? (
              <TouchableOpacity
                onPress={async () => await removeFromWatchlist(film.slug)}
              >
                <Ionicons name="star" size={24} color="#ff0" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={async () => await addToWatchlist(film.slug)}
              >
                <Ionicons name="star-outline" size={24} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.text}>{film.content}</Text>
          </View>
        </View>
        <View>
          <View style={styles.tabContainer}>
            {tabs.map((text, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tab,
                  activeTab === index && styles.activeTabText,
                  index !== 0
                    ? {
                        borderLeftColor: "rgba(255, 255, 255, 0.25)",
                        borderLeftWidth: 1,
                      }
                    : {},
                ]}
                onPress={() => handleTabPress(index)}
              >
                <Text style={[styles.tabText, styles.text]}>{text}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.tabContent}>
            {activeTab === 0 && <VideoPlayerScreen />}
            {activeTab === 1 && <CastTabContent actors={data.movie.actor} />}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const CastTabContent = ({ actors }) => {
  return (
    <View style={{ flexDirection: "column", gap: 10 }}>
      {actors.map((actorName, index) => (
        <View
          key={index}
          style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
            source={require("@assets/images/actor.jpg")}
          />
          <Text style={styles.text}>{actorName}</Text>
        </View>
      ))}
    </View>
  );
};

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
    paddingHorizontal: 15,
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  tab: {
    flex: 1,
    paddingVertical: 5,
  },
  activeTabText: {
    borderBottomColor: "#ED1B24",
    borderBottomWidth: 3,
  },
  tabText: {
    textAlign: "center",
    fontWeight: "700",
  },
  tabContent: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
