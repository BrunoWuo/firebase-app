import { StyleSheet, View, Alert } from "react-native";
import React, { useState } from "react";
import { Input, Button } from "@rneui/themed";


export default function HomeScreen({ navigation}) {  
  const [entrada, setEntrada] = useState([]);

  function onAddEntrada() {
    Alert.alert("Adicionado", entrada);
    setEntrada("");
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.formContainer}>
        <Input
          disabledInputStyle={{ background: "#ddd" }}
          label="Novo Item"
          placeholder="Digite uma nova entrada "
          onChangeText={(text) => setEntrada(text)}
          value={entrada}
          autoCapitalize="none"
        />
        <Button
          title="+"
          buttonStyle={{
            backgroundColor: "#788eec",
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 50,
          }}
          containerStyle={{
            width: 50,
          }}
          titleStyle={{ fontWeight: "bold" }}
          onPress={() => onAddEntrada()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  link: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
