import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

import { useState } from "react";

export default function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");

  function cadastrar() {
    Alert.alert("Sucesso", "Funcionário cadastrado!");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      {/* <View style={styles.container}> */}
      <View style={styles.card}>

        <Text style={styles.titulo}>ADICIONAR{"\n"}FUNCIONÁRIO</Text>

        <View style={styles.campo}>
          <Text style={styles.label}>Nome:</Text>

          <TextInput
            style={styles.input}
            placeholder="Insira o nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>

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

        <View style={styles.campo}>
          <Text style={styles.label}>Cargo:</Text>

          <TextInput
            style={styles.input}
            placeholder="Insira o cargo"
            value={cargo}
            onChangeText={setCargo}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Data Admissão:</Text>

          <TextInput
            style={styles.input}
            placeholder="Insira a de data admissão"
            value={dataAdmissao}
            onChangeText={setDataAdmissao}
          />
        </View>

        <TouchableOpacity
          style={styles.botao}
          onPress={cadastrar}
        >
          <Text style={styles.textoBotao}>CADASTRAR</Text>
        </TouchableOpacity>

      </View>
      {/* </View> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#45462A",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "85%",
    backgroundColor: "#F4E3B2",
    borderRadius: 35,
    padding: 25,
    paddingTop: 45,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    color: "#2b0010",
    marginBottom: 40,
    fontStyle: "italic",
  },

  campo: {
    marginBottom: 18,
  },

  label: {
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 8,
    color: "#000",
  },

  input: {
    backgroundColor: "#ddd5c3",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 42,
    color: "#000",
    fontStyle: "italic",
  },

  botao: {
    marginTop: 30,
    backgroundColor: "#310E10",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});