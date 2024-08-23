import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tabRoutes } from "@routes/TabRoutes";

const Tab = createBottomTabNavigator();

export default function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Favorite") {
            iconName = focused ? "star" : "star-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: "#ED1B24",
        tabBarStyle: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        },
        tabBarShowLabel: false,
      })}
    >
      {tabRoutes.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{ headerShown: false }} 
        />
      ))}
    </Tab.Navigator>
  );
}
