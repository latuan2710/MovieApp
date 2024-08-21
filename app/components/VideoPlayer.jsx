import * as ScreenOrientation from "expo-screen-orientation";
import * as VideoThumbnails from "expo-video-thumbnails";
import { ResizeMode, Video } from "expo-av";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function VideoPlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

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
    generateThumbnail();
    return async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };
  }, []);

  return (
    // <Screen>
    <View style={{ flex: 1 }}>
      {!isPlaying && <ThumbnailVideo setIsPlaying={setIsPlaying} />}
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
    // </Screen>
  );
}

const ThumbnailVideo = ({ setIsPlaying }) => {
  const [image, setImage] = useState(null);

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        {
          time: 1000,
        }
      );
      setImage(uri);
    } catch {}
  };

  useEffect(() => {
    generateThumbnail();
  }, []);

  return (
    <TouchableOpacity
      style={{ width: "100%" }}
      onPress={() => setIsPlaying(true)}
    >
      <ImageBackground
        source={image && { uri: image }}
        style={styles.thumbnail}
      >
        <View style={styles.playButton}>
          <View style={styles.playIcon} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: "100%",
    height: (Dimensions.get("window").width * 9) / 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ED1B24",
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
    width: "100%",
    height: (Dimensions.get("window").width * 9) / 16,
  },
});
