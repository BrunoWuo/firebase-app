import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { auth } from "../../firebase/firebaseConfig";
// import { signOut } from 'firebase/auth';


export default function HomeScreen({ navigation }) {

  
async function onLogOutPress() {
  try {
    await signOut(auth);
    navigation.navigate('Login')
    console.log('Logout realizado com sucesso.');
  } catch (err) {
    console.error('Erro ao realizar logout:', err);
  }
};

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>

      <Text style={styles.link} onPress={onLogOutPress}>
        Logout
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
});
