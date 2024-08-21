import FilmList from "@components/FilmList";
import Screen from "@components/Screen";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FilmList api={"danh-sach/phim-moi-cap-nhat?"}/>
        {/* <FilmList api={"the-loai/hanh-dong?"}/> */}
      </View>
    </Screen>
  );
}
