import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Input, Button } from "@rneui/themed";

import styles from "./styles";

import { auth, db } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  async function onRegisterPress() {
    if (password !== confirmPassword) {
      alert("Senhas não conferem.");
    }

    try {
      //Criar a conta do usuario
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Captura os dados e armazena em data
      const uid = response.user.uid;
      const data = {
        id: uid,
        email,
        fullName,
      };

      //Para salver em users
      const usersCollectionRef = collection(db, "users"); // Referência para a coleção "users"
      const userDocRef = doc(usersCollectionRef, uid); // Cria uma referência para o documento com o ID do usuário
      await setDoc(userDocRef, data); // Adiciona os dados ao documento
      navigation.navigate("Home", { userRef: data }); // navega para a tela home apos o cadastro      
      console.log(data);
    } catch (err) {
      if (err.code == "auth/invalid-email") {
        Alert.alert("Erro", "Email ou Senha Invalido");
      } else if (err.code == "auth/weak-password") {
        Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      } else if (err.code == "auth/missing-email") {
        Alert.alert("Erro", "Faltando Email");
      }
      console.log(err);
    } finally {
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />

        <Input
          containerStyle={{}}
          disabledInputStyle={{ background: "#ddd" }}
          label="Nome Completo"
          placeholder="nome completo"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          autoCapitalize="none"
        />

        <Input
          containerStyle={{}}
          disabledInputStyle={{ background: "#ddd" }}
          label="Email"
          placeholder="exemplo@email.com"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <Input
          containerStyle={{}}
          disabledInputStyle={{ background: "#ddd" }}
          label="Senha"
          placeholder="senha"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
        <Input
          containerStyle={{}}
          disabledInputStyle={{ background: "#ddd" }}
          label="Confirmar Senha"
          placeholder="confirmar senha"
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          autoCapitalize="none"
        />

        <Button
          title="Cadastrar"
          buttonStyle={{
            backgroundColor: "#788eec",
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: "bold" }}
          onPress={onRegisterPress}
        />

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Já tem uma conta?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Clique aqui
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
