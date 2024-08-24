import { ResizeMode, Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

export default function VideoPlayer({
  videoLink,
  currentIndex,
  setCurrentIndex,
  totalEps,
  positionRef,
}) {
  const [position] = useState(positionRef.current);

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

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded && status.isPlaying) {
      positionRef.current = status.positionMillis;
    } else if (status.didJustFinish) {
      goToNextVideo();
    }
  };

  const goToNextVideo = () => {
    if (currentIndex < totalEps - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("End of playlist");
      setCurrentIndex(0);
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
    <View style={{ flex: 1 }}>
      <Video
        source={{
          uri: videoLink,
        }}
        style={styles.normalVideo}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onFullscreenUpdate={handleFullscreenToggle}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        shouldPlay={true}
        positionMillis={position}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  normalVideo: {
    width: "100%",
    height: (Dimensions.get("window").width * 9) / 16,
  },
});
