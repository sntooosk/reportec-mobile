import { Alert, Pressable, Text, TextInput, View, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../utils/styles';
import { propsStack } from '../../routes/types';
import Icon from 'react-native-vector-icons/Feather'; // Biblioteca de ícones

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRep, setPasswordRep] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para visibilidade da senha
    const [showPasswordRep, setShowPasswordRep] = useState(false); // Estado para visibilidade da repetição da senha

    const { navigate } = useNavigation<propsStack>();
    const { signUp, isLoading } = useAuth();

    const newUser = async () => {
        if (password !== passwordRep) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        try {
            await signUp({ email, password });
            navigate("SignIn");
        } catch (error) { }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}> Primeiro acesso </Text>

            <TextInput
                style={styles.formInput}
                placeholder="E-mail de usuário"
                placeholderTextColor="#fff" 
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
            />

            {/* Campo de senha com ícone de olho */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.formInputPassword} // Estilo ajustado
                    placeholder="Senha de usuário"
                    placeholderTextColor="#fff" 
                    autoCapitalize="none"
                    secureTextEntry={!showPassword} // Controla a visibilidade da senha
                    value={password}
                    onChangeText={setPassword}
                />
                <Pressable style={styles.iconContainer} onPress={() => setShowPassword(!showPassword)}>
                    <Icon 
                        name={showPassword ? "eye" : "eye-off"} // Alterna o ícone entre olho aberto e fechado
                        size={24} 
                        color="#fff"
                    />
                </Pressable>
            </View>

            {/* Campo de repetição de senha com ícone de olho */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.formInputPassword} // Estilo ajustado
                    placeholder="Repita a senha"
                    placeholderTextColor="#fff" 
                    autoCapitalize="none"
                    secureTextEntry={!showPasswordRep} // Controla a visibilidade da repetição da senha
                    value={passwordRep}
                    onChangeText={setPasswordRep}
                />
                <Pressable style={styles.iconContainer} onPress={() => setShowPasswordRep(!showPasswordRep)}>
                    <Icon 
                        name={showPasswordRep ? "eye" : "eye-off"} // Alterna o ícone entre olho aberto e fechado
                        size={24} 
                        color="#fff"
                    />
                </Pressable>
            </View>

            <Pressable
                style={styles.formButton}
                onPress={newUser}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                ) : (
                    <Text style={styles.textButton}>Cadastrar</Text>
                )}
            </Pressable>

            <Pressable
                style={styles.subButton}
                onPress={() => navigate("SignIn")}
            >
                <Text style={styles.subTextButton}>Voltar</Text>
            </Pressable>
        </View>
    );
}
