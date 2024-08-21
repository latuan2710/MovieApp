import Screen from "@components/Screen";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("screen");
const slides = [
  {
    text: "All your favourite MARVEL Movies & Series at one place",
    image: require("@assets/welcome/Image (1).png"),
  },
  {
    text: "Watch Online or Download Offline",
    image: require("@assets/welcome/Image (2).png"),
  },
  {
    text: "Create profiles for different members & get personalised recommendations",
    image: require("@assets/welcome/Image (3).png"),
  },
  {
    text: "Plans according to your needs at affordable prices",
    image: require("@assets/welcome/Image (4).png"),
  },
  {
    text: "Let's Get Started !!!",
    image: require("@assets/welcome/Image (5).png"),
  },
];

export default function WelcomeScreen({ navigation }) {
  const scrollViewRef = useRef(null);

  const handlePress = (index) => {
    if (index === slides.length - 1) {
      navigation.navigate("Tabs");
    } else {
      scrollViewRef.current?.scrollTo({
        x: width * (index + 1),
        animated: true,
      });
    }
  };

  return (
    <Screen>
      <ScrollView ref={scrollViewRef} pagingEnabled horizontal>
        {slides.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
            <ImageBackground
              style={styles.imageBackground}
              source={item.image}
              resizeMode="cover"
            >
              <LinearGradient
                colors={["transparent", "black"]}
                start={[0, 0]}
                end={[0, 1]}
                style={{ ...StyleSheet.absoluteFillObject }}
              >
                <View style={styles.content}>
                  <View style={styles.paginationContainer}>
                    {slides.map((_, index2) => (
                      <View
                        key={index2}
                        style={[
                          styles.dot,
                          index === index2 ? styles.activeDot : {},
                        ]}
                      />
                    ))}
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.text}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handlePress(index)}
                  >
                    <Text style={styles.text}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: width,
    height: (height / 5) * 4,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    width: width,
    height: height / 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    position: "absolute",
    bottom: -height / 5,
  },
  button: {
    backgroundColor: "#ED1B24",
    width: "100%",
    paddingVertical: 15,
    position: "absolute",
    bottom: 50,
  },
  textContainer: {
    paddingHorizontal: 25,
    marginBottom: 115,
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
  },
  paginationContainer: {
    flexDirection: "row",
    marginVertical: 50,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#ED1B24",
  },
});
