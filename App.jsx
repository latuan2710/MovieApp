import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { screenRoutes } from "@routes/ScreenRoutes";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style={"light"} />
      <Stack.Navigator>
        {screenRoutes.map((screen, index) => (
          <Stack.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={screen.option}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
