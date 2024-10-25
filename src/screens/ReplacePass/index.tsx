import { View, Text, Pressable, TextInput, ActivityIndicator } from "react-native";
import { useState } from "react";
import { enviarRecuperacaoSenha } from "../../api/PasswordRecovery";
import { styles } from "../../utils/styles";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/types";

export default function ReplacePass() {
    const [resetEmail, setResetEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { navigate } = useNavigation<propsStack>();

    const replacePassword = async () => {
        setIsLoading(true);
        try {
            await enviarRecuperacaoSenha(resetEmail);
            alert("Email de recuperação enviado com sucesso");
        } catch (error) {
            alert(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>Redefinição de senha</Text>

            <TextInput
                style={styles.formInput}
                placeholder="Informe o E-mail"
                placeholderTextColor="#fff" 
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={resetEmail}
                onChangeText={setResetEmail}
            />

            <Pressable
                style={styles.formButton}
                onPress={replacePassword}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                ) : (
                    <Text style={styles.textButton}>Enviar</Text>
                )}
            </Pressable>

            <View style={styles.subContainer}>
                <Pressable 
                style = {styles.subButton}
                onPress={() => navigate("SignIn")}>
                    <Text style = {styles.subTextButton}>Voltar</Text>
                </Pressable>
            </View>
        </View>
    );
}
