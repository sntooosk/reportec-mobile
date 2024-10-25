import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B0000', // Vermelho escuro de fundo
    padding: 20,
  },
  formImage: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  formInput: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#B22222', // Vermelho mais claro para o fundo do campo de entrada
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  formInputPassword: {
    flex: 1,
    padding: 15,
    backgroundColor: '#B22222', // Vermelho para o campo de senha
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  formButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#DC143C', // Vermelho vibrante para o botão de login
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  subButton: {
    padding: 10,
  },
  subTextButton: {
    color: '#FA8072', // Tom mais claro para os links de "Cadastrar" e "Esqueceu a senha"
    fontSize: 16,
  },
});

export default styles;
