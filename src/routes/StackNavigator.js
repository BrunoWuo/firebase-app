import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
     
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
