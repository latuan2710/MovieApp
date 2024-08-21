import { ResizeMode, Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Screen from "./Screen";

export default function VideoPlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleFullscreenToggle = async (status) => {
    if (status.fullscreenUpdate === 0 || status.fullscreenUpdate === 1) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    } else if (status.fullscreenUpdate === 2 || status.fullscreenUpdate === 3) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  };

  useEffect(() => {
    return async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        {!isPlaying && (
          <TouchableOpacity
            onPress={() => setIsPlaying(true)}
            style={styles.thumbnailContainer}
          >
            <ImageBackground
              source={require("@assets/thumbnail.png")}
              style={styles.thumbnail}
            >
              <View style={styles.playButton}>
                <View style={styles.playIcon} />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
        {isPlaying && (
          <Video
            source={{
              uri: "https://vip.opstream15.com/20220419/5578_b0232121/index.m3u8",
            }}
            style={styles.normalVideo}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            onFullscreenUpdate={handleFullscreenToggle}
            shouldPlay={isPlaying}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width * 9) / 16,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "white",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
  normalVideo: {
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width * 9) / 16,
  },
  fullScreenVideo: {
    width: Dimensions.get("screen").height,
    height: Dimensions.get("screen").width,
  },
});
