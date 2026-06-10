import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import api from "../../api/api";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { } from "react-native";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();

  // const [email, setEmail] = useState("");
  // const [senha, setSenha] = useState("");
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");


  async function entrar() {

    if (!username.trim()) {
      return Alert.alert(
        "Erro",
        "Usuário é obrigatório"
      );
    }

    if (!senha.trim()) {
      return Alert.alert(
        "Erro",
        "Senha é obrigatória"
      );
    }

    try {
      const response = await api.post(
        "/auth/login",
        {
          username,
          password: senha
        }
      );

      const token = response.data.data.token_acesso;

      const respostaProtegida = await api.get(
        "/auth/rotaProtegida",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(respostaProtegida.data);

      console.log("TOKEN:", token);

      Alert.alert(
        "Sucesso",
        "Login realizado com sucesso"
      );

      navigation.navigate("Home");

    } catch (error: any) {

      console.log(error.response?.data);

      console.log(error.response?.data);

      if (error.response?.status === 401) {
        return Alert.alert(
          "Sessão inválida",
          "Seu token é inválido ou expirou. Faça login novamente."
        );
      }

      Alert.alert(
        "Erro",
        error.response?.data?.message ||
        "Falha no login"
      );
    }
  }

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      <Text style={styles.titulo}>LOGIN</Text>

      <View style={styles.card}>

        <View style={styles.campo}>
          <Text style={styles.label}>Usuário:</Text>

          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={username}
            onChangeText={setUsername}
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

