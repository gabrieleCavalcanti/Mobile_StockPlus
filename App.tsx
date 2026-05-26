import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./src/screens/Login";
import Cadastro from "./src/screens/Cadastro";
import Home from "./src/screens/Home";
import ProdutosQtd from "./src/screens/ProdutosQtd";
import ProdutosVenc from "./src/screens/ProdutoVenc";
import Movimentacoes from "./src/screens/Movimentacoes";

export type RootStackParamList = {
  Login: undefined,
  Cadastro: undefined,
  Home: undefined;
  ProdutosQtd: undefined;
  ProdutosVenc: undefined;
  Movimentacoes: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
        />

        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
        />

        <Stack.Screen
          name="Home"
          component={Home}
        // options={{
        //   headerShown: false,
        // }}
        />

        <Stack.Screen
          name="ProdutosQtd"
          component={ProdutosQtd}
        />

        <Stack.Screen
          name="ProdutosVenc"
          component={ProdutosVenc}
        />

        <Stack.Screen
          name="Movimentacoes"
          component={Movimentacoes}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}