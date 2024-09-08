import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet } from "react-native";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import HomeScreen from "../screens/HomeScreen";

import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

const Stack = createStackNavigator();

export default function StackNavigator() {
  const navigation = useNavigation();

  function onLogOutPress() {
    try {
      signOut(auth);      
      console.log("Logout realizado com sucesso.");
    } catch (err) {
      console.error("Erro ao realizar logout:", err);
    } finally {
      navigation.navigate("Login");
    }
    
  }
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
          headerRight: () => <Text onPress={onLogOutPress} style={styles.logout} color="#788eec" >Sair</Text>,
          headerStyle: {
            shadowColor: "#000", // Cor da sombra          
          },
        }}
      />
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  logout: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
    paddingRight:10
  },
})