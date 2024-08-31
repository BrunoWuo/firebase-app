import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: null,
          headerStyle: {
            shadowColor: "#000", // Cor da sombra
            shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
            shadowOpacity: 0.3, // Opacidade da sombra
            shadowRadius: 3, // Raio da sombra
            elevation: 5, // Elevação para Android
          },
        }}
      />
    </Stack.Navigator>
  );
}
