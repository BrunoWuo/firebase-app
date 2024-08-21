import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Input, Button } from "@rneui/themed";



import styles from "./styles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const onLoginPress = () => {
    alert("login");
  };

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
