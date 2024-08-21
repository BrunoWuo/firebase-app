import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Input, Button } from "@rneui/themed";

import styles from "./styles";
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
      alert("Senhas não conferem!");
      return;
    }
    const user = await createUserWithEmailAndPassword(auth, "teste2@teste.com", "123456")
    console.log(user)
    
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../../assets/icon.png")} />

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
  );
}
