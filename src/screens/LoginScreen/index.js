import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Input, Button } from "@rneui/themed";

import styles from "./styles";

import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  // async function onLoginPress() {
  //   const user = await signInWithEmailAndPassword(auth, email, password)
  //   alert('LOGADO')
  //   console.log(user)
  // };

  async function onLoginPress() {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigation.navigate("Home");
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        alert('Email inválido');
      } else if (err.code === "auth/missing-password") {
        alert('A Senha é obrigatória');
      } else {
        console.log(err);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../../assets/icon.png")} />
   
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
      </View>
    </View>
  );
}
