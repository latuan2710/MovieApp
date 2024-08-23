import FavoritesScreen from "@screens/Favorites";
import SearchScreen from "@screens/Search";
import HomeScreen from "@screens/Home";

export const tabRoutes = [
  {
    name: "Home",
    component: HomeScreen,
  },
  {
    name: "Search",
    component: SearchScreen,
  },
  {
    name: "Favorite",
    component: FavoritesScreen,
  },
];
