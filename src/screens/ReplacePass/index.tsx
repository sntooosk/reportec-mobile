import {
    View,
    Text,
    Pressable,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    Image,
    Animated,
  } from "react-native";
  import React, { useState } from "react";
  import { enviarRecuperacaoSenha } from "../../api/PasswordRecovery";
  import { useNavigation } from "@react-navigation/native";
  import { propsStack } from "../../routes/types";
  
  export default function ReplacePass() {
    const [resetEmail, setResetEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { navigate } = useNavigation<propsStack>();
  
    const animatedValue = new Animated.Value(0);
  
    const animateCard = () => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    };
  
    React.useEffect(() => {
      animateCard();
    }, []);
  
    const cardTranslateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });
  
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
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
  
        <Animated.View
          style={[styles.formCard, { transform: [{ translateY: cardTranslateY }] }]}
        >
          <Text style={styles.formTitle}>Redefinição de senha</Text>
  
          <TextInput
            style={styles.formInput}
            placeholder="Informe o E-mail"
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={resetEmail}
            onChangeText={setResetEmail}
          />
  
          <Pressable style={styles.formButton} onPress={replacePassword} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.textButton}>Enviar</Text>
            )}
          </Pressable>
  
          <View style={styles.subContainer}>
            <Pressable style={styles.subButton} onPress={() => navigate("SignIn")}>
              <Text style={styles.subTextButton}>Voltar</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#8B0000",
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      width: 120,
      height: 120,
      marginTop: 60,
      marginBottom: 20,
      resizeMode: "contain",
    },
    formCard: {
      position: "absolute",
      top: "30%",
      bottom: 0,
      width: "100%",
      backgroundColor: "#FFF",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    formTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#8B0000",
      marginBottom: 20,
      textAlign: "center",
    },
    formInput: {
      width: "90%",
      padding: 12,
      marginVertical: 10,
      borderColor: "#8B0000",
      borderWidth: 1,
      borderRadius: 8,
      color: "#333333",
      fontSize: 16,
      backgroundColor: "#FAFAFA",
    },
    formButton: {
      width: "90%",
      paddingVertical: 12,
      backgroundColor: "#8B0000",
      borderRadius: 8,
      alignItems: "center",
      marginVertical: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    textButton: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold",
    },
    subContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
    },
    subButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    subTextButton: {
      color: "#8B0000",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
  