
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type propsNavigationStack = {
  Home: undefined | any; // Tela inicial


  // Tipos para as telas da Stack

  SignIn: undefined | any; // Tela de login
  SignUp: undefined | any; // Segunda tela de cadastro
  Profile: undefined | any; // Primeira tela de cadastro
  Home:  undefined | any; // Tela Principal
  ReplacePass :  undefined | any; // Tela Recuperar senha
  AddCard: undefined | any; // Tela Adiocionar o cartão
  CardDetails: undefined | any; // Tela Detalhe do Cartao
  Recarga: undefined | any; // Tela de Recarga
  Extrato: undefined | any; // Tela de Extrato


};

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
