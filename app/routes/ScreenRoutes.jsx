import DetailScreen from "@screens/Detail";
import IntroScreen from "@screens/Intro";
import TabScreen from "@screens/TabScreen";
import WelcomeScreen from "@screens/Welcome";

export const screenRoutes = [
  // {
  //   name: "Intro",
  //   component: IntroScreen,
  //   option: {
  //     headerShown: false,
  //   },
  // },
  // {
  //   name: "Welcome",
  //   component: WelcomeScreen,
  //   option: {
  //     headerShown: false,
  //   },
  // },
  {
    name: "Tabs",
    component: TabScreen,
    option: {
      headerShown: false,
    },
  },
  {
    name: "Detail",
    component: DetailScreen,
    option: {
      headerTransparent: true,
      headerTintColor: "white",
      headerTitle: "",
    },
  },
];
