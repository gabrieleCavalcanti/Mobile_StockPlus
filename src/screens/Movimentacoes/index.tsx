import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MovimentacaoRegistro {
  id_movimentacao: number;
  quantidade: number;
  status: "ENTRADA" | "CONCLUIDO" | "DEVOLVIDO";
  id_itens_pedido: number;
  nome_produto: string;
  preco_unitario: number;
  fornecedor?: string;
  cliente?: string;
}

export default function MovimentacoesScreen() {
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoRegistro[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const dadosDoBanco: MovimentacaoRegistro[] = [
      { id_movimentacao: 1, quantidade: 45, status: "ENTRADA", id_itens_pedido: 101, nome_produto: "Camiseta  M", preco_unitario: 29.90, fornecedor: "Malhas & Cia Ltda" },
      { id_movimentacao: 3, quantidade: 150, status: "CONCLUIDO", id_itens_pedido: 103, nome_produto: "Boné Aba Curva", preco_unitario: 15.00, cliente: "Lojas Americanas S/A" },
      { id_movimentacao: 4, quantidade: 3, status: "DEVOLVIDO", id_itens_pedido: 104, nome_produto: "Tênis Esportivo 40", preco_unitario: 199.00, cliente: "Ana Julia Ribeiro" },
    ];
    setMovimentacoes(dadosDoBanco);
  }, []);

  const getStatusColor = (status: string) => {
    return status === "ENTRADA" ? "#45462A" : "#74070E";
  };

  const getSignal = (status: string) => {
    return (status === "ENTRADA" || status === "DEVOLVIDO") ? "+" : "-";
  };

  const formatStatusLabel = (status: string) => {
    return status.toLowerCase();
  };

  const formatMoeda = (valor: number) => {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  };

  const dadosFiltrados = movimentacoes.filter((item) => {
    const textoBusca = search.toLowerCase();
    return (
      item.status.toLowerCase().includes(textoBusca) ||
      item.nome_produto.toLowerCase().includes(textoBusca) ||
      (item.cliente && item.cliente.toLowerCase().includes(textoBusca)) ||
      (item.fornecedor && item.fornecedor.toLowerCase().includes(textoBusca))
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Buscar por status, produto ou nome..."
          placeholderTextColor="#947268"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>

      <FlatList
        data={dadosFiltrados}
        keyExtractor={(item) => item.id_movimentacao.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum registro encontrado.</Text>
        }
        renderItem={({ item }) => {
          const valorTotal = item.quantidade * item.preco_unitario;

          return (
            <View style={styles.card}>
              <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
              
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {formatStatusLabel(item.status)}
                </Text>
                
                <Text style={styles.cardInvolvedName} numberOfLines={1}>
                  {item.status === "ENTRADA" ? item.fornecedor : item.cliente}
                </Text>
                
                <Text style={styles.cardProduct} numberOfLines={1}>{item.nome_produto}</Text>
                
                <Text style={styles.cardValues}>
                  Val. Unit: {formatMoeda(item.preco_unitario)}
                </Text>
              </View>

              <View style={styles.rightContainer}>
                <Text style={[styles.quantityText, { color: getStatusColor(item.status) }]}>
                  {getSignal(item.status)}{item.quantidade} <Text style={styles.quantityLabel}>unid.</Text>
                </Text>
                
                <Text style={styles.totalText}>
                  Total: {formatMoeda(valorTotal)}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE0CB', 
    paddingHorizontal: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4E3B2',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 25,
    height: 50,
    elevation: 2,
    shadowColor: '#310E10',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    color: '#310E10',
    fontSize: 16,
  },
  searchIcon: {
    fontSize: 16,
    color: '#310E10',
  },
  listContainer: {
    gap: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#F4E3B2', 
    borderRadius: 16,
    minHeight: 115, 
    flexDirection: 'row',
    overflow: 'hidden', 
    elevation: 2,
    shadowColor: '#310E10',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: 14,
  },
  statusIndicator: {
    width: 14, 
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 34, 
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#310E10', 
    textTransform: 'lowercase',
    marginBottom: 2,
  },
  cardInvolvedName: {
    fontSize: 13,
    fontWeight: '600', 
    color: '#45462A',
  },
  cardProduct: {
    fontSize: 13,
    color: '#310E10', 
    marginTop: 2,
  },
  cardValues: {
    fontSize: 11,
    color: '#947268',
    marginTop: 4,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
    minWidth: 120, 
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityLabel: {
    fontSize: 11,
    color: '#45462A',
    fontWeight: 'normal',
  },
  totalText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#310E10',
    marginTop: 6,
  },
  emptyText: {
    textAlign: 'center',
    color: '#947268',
    marginTop: 40,
    fontSize: 16,
  }
});
