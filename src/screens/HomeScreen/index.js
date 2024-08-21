import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function HomeScreen() {
  function onLogOutPress() {
    alert("SAIR");
  }

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
