import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Input, Button } from "@rneui/themed";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  setDoc,
  doc,
  Timestamp,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function HomeScreen({ route }) {
  const { id } = route.params.userRef; //Captura o id vindo pela rota

  const [tarefa, setTarefa] = useState(""); // Estado para armazenar item
  const [listaTarefas, setListaTarefas] = useState([]); // Estado para armazenar a lista de item
  const [editandoTarefa, setEditandoTarefa] = useState(null); // Estado para armazenar o item sendo editado
  const tarefasCollectionRef = collection(db, "tarefas"); // cosntante da colecao tarefas

  // Atualiza a lista de tarefas acessando o firebase
  useEffect(() => {
    const selectListaTarefas = onSnapshot(
      tarefasCollectionRef,
      (querySnapshot) => {
        const tarefasFiltradas = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Verifica se o authorID da tarefa corresponde ao ID do usuário logado
          if (data.authorID === id) {
            tarefasFiltradas.push({ id: doc.id, ...data });
          }
        });
        setListaTarefas(tarefasFiltradas);
      }
    );
    // Função de limpeza para selectListaTarefas na desmontagem
    return () => selectListaTarefas();
  }, [id]);

  // Adiciona novo item ao firebase
  async function onAddEntrada() {
    if (tarefa.length === 0) {
      Alert.alert("Erro", "Entrada em Branco");
      return;
    }
    try {
      const timestamp = Timestamp.now();
      const data = {
        authorID: id,
        tarefa: tarefa,
        createdAt: timestamp,
      };

      if (editandoTarefa) {
        // Se estiver editando, atualiza o item existente
        await updateDoc(doc(tarefasCollectionRef, editandoTarefa.id), {
          tarefa: tarefa,
          updatedAt: timestamp,
        });
        Alert.alert("Mensagem", "Tarefa Editada.");
        setEditandoTarefa(null); // Resetar o estado de edição
      } else {
        // Se não estiver editando, adiciona um novo item
        const tarefasDocRef = doc(tarefasCollectionRef);
        await setDoc(tarefasDocRef, data);
        Alert.alert("Mensagem", "Tarefa Adicionada.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTarefa("");
      Keyboard.dismiss();
    }
  }

  // Função para excluir um item do Firebase
  async function onDeleteEntrada(itemId) {
    try {
      await deleteDoc(doc(tarefasCollectionRef, itemId));
      Alert.alert("Mensagem", "Tarefa excluída.");
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Não foi possível excluir a tarefa.");
    }
  }

  // Função para iniciar o modo de edição
  function onEditEntrada(item) {
    setTarefa(item.tarefa); // Preenche o input com o texto atual
    setEditandoTarefa(item); // Define o item que está sendo editado
  }

  // Componente item da lista
  const renderTarefas = ({ item, index }) => {
    return (
      <View style={styles.tarefaContainer}>
        <Text style={styles.tarefaText}>
          {index + 1}. {item.tarefa}
        </Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onEditEntrada(item)}
          >
            <MaterialIcons name="mode-edit" size={16} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDeleteEntrada(item.id)}
          >
            <MaterialIcons name="delete" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
        <FlatList
          data={listaTarefas}
          renderItem={renderTarefas}
          keyExtractor={(item) => item.id}
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
    marginHorizontal: 10,
  },
  tarefaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  tarefaText: {
    fontSize: 20,
    color: "#788eec",
  },
  iconContainer: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "#53bc44", // Verde para o botão de editar
    padding: 10,
    borderRadius: 50,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#ec4b5d", // Vermelho para o botão de excluir
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
