import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.appTitle}>StockPlus</Text> 
        <Text style={styles.welcomeText}>Painel de Controle</Text>
      </View>

      <View style={styles.menuContainer}>
        
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Movimentacoes')}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Movimentações</Text>
            <Text style={styles.cardSubtitle}>Histórico de entradas e saídas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, styles.cardAlert]} 
          onPress={() => navigation.navigate('ProdutosQtd')}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, styles.textAlert]}>Estoque Baixo</Text>
            <Text style={[styles.cardSubtitle, styles.textAlertSecondary]}>Produtos atingindo o limite mínimo</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('ProdutosVenc')}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Vencimentos</Text>
            <Text style={styles.cardSubtitle}>Alertas de validade de produtos</Text>
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#310E10', 
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
  },
  appTitle: {
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
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F4E3B2',
    marginTop: 16,
  },
  menuContainer: {
    gap: 16, 
  },
  card: {
    backgroundColor: '#947268', 
    borderRadius: 20, 
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(234, 224, 203, 0.1)', 
  },
  cardAlert: {
    backgroundColor: '#74070E', 
  },
  cardContent: {
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#310E10', 
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#EAE0CB', 
    marginTop: 4,
  },
  textAlert: {//
    color: '#F4E3B2', 
  },
  textAlertSecondary: {
    color: '#EAE0CB',
    opacity: 0.8,
  },
});
