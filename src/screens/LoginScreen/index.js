import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Input, Button } from "@rneui/themed";

import styles from "./styles";

import { auth, db } from "../../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, getDoc, doc } from "firebase/firestore";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  async function resetPassword() {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Redefinir Senha", "Email enviado para " + email);
    } catch (err) {
      if (err.code === "auth/missing-email") {
        Alert.alert("Erro", "Digite o seu Email");
      }
      console.log(err);
    }
  }

  async function onLoginPress() {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      //Para Recuperar em users
      const uid = response.user.uid;
      const userDocRef = doc(collection(db, "users"), uid); // Create doc reference
      const userSnapshot = await getDoc(userDocRef); // Get user document

      console.log(userDocRef)

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        console.log(userData); // Verificar os dados no console
        navigation.navigate("Home", { userRef: userData });
      } else {
        console.log("Usuário não encontrado.");
      }
      
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        Alert.alert("Erro", "Email ou Senha inválido");
      } else if (err.code === "auth/missing-password") {
        Alert.alert("Erro", "A Senha é obrigatória");
      } else {
        console.log(err);
      }
    } finally {
      setEmail("");
      setPassword("");
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
          disabledInputStyle={{ background: "#ddd" }}
          label="Email"
          placeholder="exemplo@email.com"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <Input
          disabledInputStyle={{ background: "#ddd" }}
          label="Senha"
          placeholder="senha"
          secureTextEntry={!passwordVisible}
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />

        <Button
          title="Entrar"
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
          onPress={() => onLoginPress()}
        />

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Não tem uma conta?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Clique aqui
            </Text>
          </Text>

          <Text onPress={resetPassword} style={styles.footerLink}>
            Esqueci a senha
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
