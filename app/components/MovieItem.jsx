import { useNavigation } from "@react-navigation/native";
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet
} from "react-native";

export default function MovieItem({ slug }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Detail", { slug });
  };

  return (
    <Pressable style={styles.pressable} onPress={handlePress}>
      <Image
        style={styles.image}
        source={{
          uri: `https://img.ophim.live/uploads/movies/${slug}-thumb.jpg`,
        }}
        resizeMode="cover"
      />
    </Pressable>
  );
}

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  pressable: {
    padding: 5,
    width: width / 3,
    height: (width / 16) * 9,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
