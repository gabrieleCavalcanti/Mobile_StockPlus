import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";


type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;


export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView >
      {/* <Text>Pagina Home</Text> */}
      <Text>Tela Home</Text>


      <TouchableOpacity onPress={() => navigation.navigate('Movimentacoes')} >
        <Text>Movimentações</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ProdutosQtd')}>
        <Text>Estoque Baixo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ProdutosVenc')}>
        <Text>Vencimentos</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}