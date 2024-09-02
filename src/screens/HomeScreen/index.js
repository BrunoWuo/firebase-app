import { StyleSheet, View, Alert, Text, Keyboard } from "react-native";
import React, { useState, useEffect } from "react";
import { Input, Button } from "@rneui/themed";

import { db } from "../../firebase/firebaseConfig";
import { collection, setDoc, doc, Timestamp } from "firebase/firestore";

export default function HomeScreen({ navigation, route }) {
  const { id } = route.params.userRef;
  const [tarefa, setTarefa] = useState([]);
  const [listTarefa, setListaTarefa] = useState([]);
  const tarefasCollectionRef = collection(db, "tarefas");

  useEffect(() => {}, []);

  async function onAddEntrada() {
    if (tarefa.length < 0) {
      Alert.alert("Erro", "Entrada em Branco");
      return;
    }
    try {
      const timestamp = Timestamp.now();
      const data = {
        authorID: id,
        tareafa: tarefa,
        createdAt: timestamp,
      };

      const tarefasDocRef = doc(tarefasCollectionRef);
      const docRef = await setDoc(tarefasDocRef, data);
      Alert.alert("Mensagem", "Tarefa Adicionada.");
      console.log(docRef);
    } catch (err) {
      console.log(err);
    } finally {
      setTarefa("");
      Keyboard.dismiss();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Input
          disabledInputStyle={{ background: "#ddd" }}
          placeholder="Digite uma nova entrada "
          onChangeText={(text) => setTarefa(text)}
          value={tarefa}
          autoCapitalize="none"
        />
        <Button
          title="+"
          buttonStyle={{
            backgroundColor: "#788eec",
            borderWidth: 3,
            borderColor: "white",
            borderRadius: 50,
          }}
          containerStyle={{
            width: 45,
          }}
          titleStyle={{ fontWeight: "bold" }}
          onPress={() => onAddEntrada()}
        />
      </View>
      <View style={styles.listContainer}>
        <Text>Lista Vazia</Text>
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
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 10,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "red",
    marginHorizontal: 10,
  },
});
