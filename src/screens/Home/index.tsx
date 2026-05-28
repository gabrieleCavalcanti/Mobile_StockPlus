import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView style={styles.bg}>
      
      <View style={styles.topo}>
        <Text style={styles.logo}>StockPlus</Text> 
        <Text style={styles.sub}>Painel de Controle</Text>
      </View>

      <View style={styles.grade}>
        
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Movimentacoes')}
        >
          <View style={styles.bloco}>
            <Text style={styles.titulo}>Movimentações</Text>
            <Text style={styles.detalhe}>Histórico de entradas e saídas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, styles.alerta]} 
          onPress={() => navigation.navigate('ProdutosQtd')}
        >
          <View style={styles.bloco}>
            <Text style={[styles.titulo, styles.txtAlerta]}>Estoque Baixo</Text>
            <Text style={[styles.detalhe, styles.txtAlertaSub]}>Produtos atingindo o limite mínimo</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('ProdutosVenc')}
        >
          <View style={styles.bloco}>
            <Text style={styles.titulo}>Vencimentos</Text>
            <Text style={styles.detalhe}>Alertas de validade de produtos</Text>
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#310E10', 
    paddingHorizontal: 24,
  },
  topo: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EAE0CB',
    borderWidth: 1,
    borderColor: '#EAE0CB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    textTransform: 'uppercase',
  },
  sub: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F4E3B2',
    marginTop: 16,
  },
  grade: {
    gap: 16, 
  },
  card: {
    backgroundColor: '#947268', 
    borderRadius: 20, 
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(234, 224, 203, 0.1)', 
  },
  alerta: {
    backgroundColor: '#74070E', 
  },
  bloco: {
    flexDirection: 'column',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#310E10', 
  },
  detalhe: {
    fontSize: 13,
    color: '#EAE0CB', 
    marginTop: 4,
  },
  txtAlerta: {
    color: '#F4E3B2', 
  },
  txtAlertaSub: {
    color: '#EAE0CB',
    opacity: 0.8,
  },
});
