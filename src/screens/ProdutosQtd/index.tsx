import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import api from "../../api/api";

type EstoqueBaixo = {
  idProduto: number;
  quantidade: number;
  quantidade_minima: number;
  status: string;
};

type Produto = {
  id_produto: number;
  nome_produto: string;
  valor_produto: string;
  vinculo_imagem: string;
};

type ProdutoComEstoque = Produto & EstoqueBaixo;

export default function ProdutosQtdScreen() {
  const [produtos, setProdutos] = useState<ProdutoComEstoque[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      // 🔹 1. Busca estoque baixo
      const estoqueResponse = await api.get<EstoqueBaixo[]>("estoque/baixo");

      // 🔹 2. Busca produtos
      const produtosResponse = await api.get("produtos");

      const listaProdutos: Produto[] =
        produtosResponse.data?.resultadoSelecionaTodos ?? [];

      // 🔹 3. Junta produto + estoque
      const combinados: ProdutoComEstoque[] = estoqueResponse.data.map(
        (estoque) => {
          const produto = listaProdutos.find(
            (p) => p.id_produto === estoque.idProduto
          );

          return {
            ...produto!,
            ...estoque,
          };
        }
      ).filter(item => item.nome_produto); // remove inválidos

      setProdutos(combinados);
    } catch (error) {
      console.error("Erro ao carregar estoque baixo", error);
      setProdutos([]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Estoque Baixo</Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => String(item.idProduto)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.vinculo_imagem }}
              style={styles.imagem}
            />

            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome_produto}</Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>

              <Text style={styles.texto}>
                Preço: R$ {Number(item.valor_produto).toFixed(2)}
              </Text>

              <Text style={styles.texto}>
                Mínimo: {item.quantidade_minima} unidades
              </Text>

              <Text style={styles.texto}>
                Estoque Atual: {item.quantidade} unidades
              </Text>

              <Text style={styles.alerta}>
                ⚠ Faltam{" "}
                {item.quantidade_minima - item.quantidade} unidades
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A0000",
    paddingHorizontal: 15,
    paddingTop: 50,
  },

  titulo: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#B07A69",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    alignItems: "center",
  },

  imagem: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: "#FFF",
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  nome: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  texto: {
    color: "#FFF",
    fontSize: 14,
    marginBottom: 2,
  },

  badge: {
    backgroundColor: "#D32F2F",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
    marginTop: 4,
  },

  badgeText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "bold",
  },

  alerta: {
    color: "#FFD54F",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 6,
  },
});