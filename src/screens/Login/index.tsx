import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, KeyboardAvoidingView, Platform} from "react-native";
import { useState } from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import {  } from "react-native";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    Alert.alert("Login", "Login realizado com sucesso!");
    navigation.navigate("Home");
  }

  return (
    // <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >

        <Text style={styles.titulo}>LOGIN</Text>

        <View style={styles.card}>

          <View style={styles.campo}>
            <Text style={styles.label}>Email:</Text>

            <TextInput
              style={styles.input}
              placeholder="Insira o email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Senha:</Text>

            <TextInput
              style={styles.input}
              placeholder="Insira a senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <TouchableOpacity
            style={styles.botao}
            onPress={entrar}
          >
            <Text style={styles.textoBotao}>ENTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Cadastro")}
          >
            <Text style={styles.novo}>NOVO</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    // </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#310E10",
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "900",
    color: "#f2ddb0",
    fontStyle: "italic",
    marginBottom: 55,
  },

  card: {
    width: "82%",
    backgroundColor: "#a8857b",
    borderRadius: 35,
    padding: 25,
  },

  campo: {
    marginBottom: 18,
  },

  label: {
    color: "#000",
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#efe6d0",
    borderRadius: 20,
    height: 42,
    paddingHorizontal: 15,
    color: "#000",
    fontStyle: "italic",
  },

  botao: {
    backgroundColor: "#310E10",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontStyle: "italic",
  },

  novo: {
    textAlign: "center",
    marginTop: 15,
    color: "#f2ddb0",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});

