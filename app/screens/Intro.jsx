import { useNavigation } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import { Dimensions } from "react-native";

export default function IntroScreen() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("screen");

  return (
    <Video
      source={require("@assets/intro.mp4")}
      style={{ width: width, height: height }}
      useNativeControls={false}
      resizeMode={ResizeMode.COVER}
      isLooping={false}
      shouldPlay
      onPlaybackStatusUpdate={(status) => {
        if (status.isLoaded && status.didJustFinish) {
          navigation.navigate("Welcome");
        }
      }}
    />
  );
}
