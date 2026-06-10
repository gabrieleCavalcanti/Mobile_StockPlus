import api from "../../api/api";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform, } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useState } from "react";

export default function CadastroScreen() {

  //quero fazar uma lista, estatico mesmo, mas para conseguir simular um cadastro, e login, 

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");

  const [dataAdmissao, setDataAdmissao] = useState(new Date());
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  // function cadastrar() {
  //   if (!nome.trim()) {
  //     return Alert.alert("Erro", "Nome é obrigatório");
  //   }

  //   if (!email.trim()) {
  //     return Alert.alert("Erro", "Email é obrigatório");
  //   }

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (!emailRegex.test(email)) {
  //     return Alert.alert("Erro", "Email inválido");
  //   }

  //   if (!senha.trim()) {
  //     return Alert.alert("Erro", "Senha é obrigatória");
  //   }

  //   const senhaRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

  //   if (!senhaRegex.test(senha)) {
  //     return Alert.alert(
  //       "Erro",
  //       "A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial."
  //     );
  //   }
  //   // CARGO
  //   if (!cargo.trim()) {
  //     return Alert.alert("Erro", "Cargo é obrigatório");
  //   }
  //   usuarios.push({
  //     nome,
  //     email,
  //     senha,
  //     cargo,
  //     dataAdmissao,
  //   });

  //   console.log(usuarios);

  //   Alert.alert("Sucesso", "Funcionário cadastrado!");
  // }

  async function cadastrar() {
    try {

      const response = await api.post("/pessoas", {
        nome_pessoa: nome,
        email,
        tipo: "FUNCIONARIO",
        cargo,
        data_admissao: dataAdmissao
          .toISOString()
          .split("T")[0],
        username: user,
        password: senha
      });

      Alert.alert(
        "Sucesso",
        response.data.message
      );

      console.log(response.data);

    } catch (error: any) {
      console.log(error.response?.data);
      console.log(error.response?.status);
      Alert.alert(
        "Erro",
        error.response?.data?.message ||
        "Erro ao cadastrar"
      );

    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      <View style={styles.card}>

        <Text style={styles.titulo}>
          ADICIONAR{"\n"}FUNCIONÁRIO
        </Text>

        <View style={styles.campo}>
          <Text style={styles.label}>Nome *</Text>

          <TextInput
            style={styles.input}
            placeholder="Insira o nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Email *</Text>

          <TextInput
            style={styles.input}
            placeholder="Insira o email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Username *</Text>

          <TextInput
            style={styles.input}
            placeholder="Insira um username"
            value={user}
            onChangeText={setUser}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Senha *</Text>

          <TextInput
            style={styles.input}
            placeholder="Mínimo 8 caracteres"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Cargo *</Text>

          <TextInput
            style={styles.input}
            placeholder="Insira o cargo"
            value={cargo}
            onChangeText={setCargo}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Data Admissão *</Text>

          <TouchableOpacity
            style={styles.input}
            onPress={() => setMostrarCalendario(true)}
          >
            <Text>
              {dataAdmissao.toLocaleDateString("pt-BR")}
            </Text>
          </TouchableOpacity>

          {mostrarCalendario && (
            <DateTimePicker
              value={dataAdmissao}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setMostrarCalendario(false);

                if (date) {
                  setDataAdmissao(date);
                }
              }}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.botao}
          onPress={cadastrar}
        >
          <Text style={styles.textoBotao}>  CADASTRAR   </Text>

        </TouchableOpacity>

      </View>

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
    justifyContent: "center",
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