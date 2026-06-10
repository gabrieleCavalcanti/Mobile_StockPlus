import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../../src/api/api'; 

interface MovimentacaoRegistro {
  id_movimentacao: number;
  status_movimentacao: "entrada" | "saida";
  data_cadastro: string; 
  quantidade: number;
  status_item: string; 
  id_pedido: number;
  id_produto: number;
  nome_produto: string;
  valor_produto: number;
  nome_cliente_fornecedor: string;
  tipo_pedido: "cliente" | "fornecedor"; 
  valor_total_movimentacao: number;
  valor_total_formatado: string; 
}

export default function MovimentacoesScreen() {
    const [movimentacoes, setMovimentacoes] = useState<MovimentacaoRegistro[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const setup = async () => {
           await loadData();
        }
        setup();
    }, [])

    async function loadData(): Promise<void> {
        try {
            const response = await api.get('/movimentacao');
            console.log(response.data);
            
            setMovimentacoes(response.data.estoque); 
            
        } catch (error) {
            console.error(error);
        }
    }

    const getStatusColor = (status: string) => {
        return status === "entrada" ? "#45462A" : "#74070E";
    };

    const getSignal = (status: string) => {
        return status === "entrada" ? "+" : "-";
    };

    const formatMoeda = (valor: any) => {
        const valorNumerico = Number(valor) || 0;
        return `R$ ${valorNumerico.toFixed(2).replace('.', ',')}`;
    };

    const formatData = (dataString: string) => {
        if (!dataString) return "";
        const data = new Date(dataString);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const dadosFiltrados = movimentacoes.filter((item) => {
        const textoBusca = search.toLowerCase();
        return (
            item.status_movimentacao.toLowerCase().includes(textoBusca) ||
            item.nome_produto.toLowerCase().includes(textoBusca) ||
            item.nome_cliente_fornecedor.toLowerCase().includes(textoBusca) ||
            item.tipo_pedido.toLowerCase().includes(textoBusca) ||
            item.status_item.toLowerCase().includes(textoBusca) ||
            formatData(item.data_cadastro).includes(textoBusca)
        );
    });

    return (
        <SafeAreaView style={styles.bg}>
          
          <View style={styles.buscaBox}>
            <TextInput 
              style={styles.input}
              placeholder="Buscar por status, produto ou nome..."
              placeholderTextColor="#947268"
              value={search}
              onChangeText={setSearch}
            />
            <Text style={styles.icone}>🔍</Text>
          </View>

          <FlatList
            data={dadosFiltrados}
            keyExtractor={(item) => String(item.id_movimentacao)} 
            contentContainerStyle={styles.lista}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.vazio}>Nenhum registro encontrado.</Text>
            }
            renderItem={({ item }) => (
                <View style={styles.card}>
                  <View style={[styles.barra, { backgroundColor: getStatusColor(item.status_movimentacao) }]} />
                  
                  <View style={styles.info}>
                    <Text style={styles.status} numberOfLines={1}>
                      {item.status_movimentacao}
                    </Text>
                    
                    <Text style={styles.nome} numberOfLines={1}>
                      <Text style={styles.badgeTipo}>({item.tipo_pedido})</Text> {item.nome_cliente_fornecedor}
                    </Text>
                    
                    <Text style={styles.produto} numberOfLines={1}>{item.nome_produto}</Text>
                    
                    <Text style={styles.unitario}>
                      Val. Unit: {formatMoeda(item.valor_produto)}
                    </Text>

                    <Text style={styles.dataTexto}>
                      Data: {formatData(item.data_cadastro)}
                    </Text>
                  </View>

                  <View style={styles.direita}>
                    <Text style={[styles.qtd, { color: getStatusColor(item.status_movimentacao) }]}>
                      {getSignal(item.status_movimentacao)}{item.quantidade} <Text style={styles.unid}>unid.</Text>
                    </Text>
                    
                    <Text style={styles.total}>
                      Total: {item.valor_total_formatado}
                    </Text>

                    <Text style={styles.situacaoItem}>
                      {item.status_item.toLowerCase()}
                    </Text>
                  </View>
                </View>
            )}
          />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  bg: { 
    flex: 1, 
    backgroundColor: '#EAE0CB', 
    paddingHorizontal: 24 
  },
  buscaBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F4E3B2', 
    borderRadius: 25, 
    paddingHorizontal: 20, 
    marginTop: 20, 
    marginBottom: 25, 
    height: 50, 
    elevation: 2, 
    shadowColor: '#000000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4 
  },
  input: { 
    flex: 1, 
    color: '#000000', 
    fontSize: 16 
  },
  icone: { 
    fontSize: 16, 
    color: '#000000' 
  },
  lista: { 
    gap: 16, 
    paddingBottom: 24 
  },
  card: { 
    backgroundColor: '#F4E3B2', 
    borderRadius: 16, 
    minHeight: 130, 
    flexDirection: 'row', 
    overflow: 'hidden', 
    elevation: 2, 
    shadowColor: '#000000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    paddingVertical: 14 
  },
  barra: { 
    width: 14, 
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    left: 0 
  },
  info: { 
    flex: 1, 
    justifyContent: 'center', 
    paddingLeft: 34, 
    paddingRight: 10 
  },
  status: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textTransform: 'lowercase', 
    marginBottom: 2 
  },
  nome: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#000000' 
  },
  badgeTipo: { 
    fontWeight: '600', 
    color: '#444444', 
    fontSize: 12, 
    textTransform: 'lowercase' 
  },
  produto: { 
    fontSize: 14, 
    fontWeight: '500',
    color: '#000000', 
    marginTop: 2 
  },
  unitario: { 
    fontSize: 12, 
    fontWeight: '500',
    color: '#222222', 
    marginTop: 4 
  },
  dataTexto: { 
    fontSize: 11, 
    fontWeight: '600',
    color: '#333333', 
    marginTop: 6 
  },
  direita: { 
    justifyContent: 'center', 
    alignItems: 'flex-end', 
    paddingRight: 16, 
    minWidth: 125 
  },
  qtd: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  unid: { 
    fontSize: 12, 
    color: '#000000', 
    fontWeight: 'bold' 
  },
  total: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#000000', 
    marginTop: 6 
  },
  situacaoItem: { 
    fontSize: 11, 
    fontWeight: 'bold',
    marginTop: 8, 
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1, 
    textTransform: 'uppercase'
  },
  vazio: { 
    textAlign: 'center', 
    color: '#000000', 
    marginTop: 40, 
    fontSize: 16 
  }
});
