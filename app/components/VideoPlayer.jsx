import * as ScreenOrientation from "expo-screen-orientation";
import { ResizeMode, Video } from "expo-av";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

export default function VideoPlayer({ videoLink }) {
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
    <View style={{ flex: 1 }}>
      <Video
        source={{
          uri: videoLink,
        }}
        style={styles.normalVideo}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onFullscreenUpdate={handleFullscreenToggle}
        shouldPlay={true}
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
