import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/types";
import Icon from "react-native-vector-icons/Feather";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, isLoading } = useAuth();
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

  const userLogin = () => {
    signIn({ email, password });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.formImage}
        source={require("../../assets/logo.png")}
      />

      <Animated.View
        style={[
          styles.formCard,
          { transform: [{ translateY: cardTranslateY }] },
        ]}
      >
        <Text style={styles.formTitle}>Entrar</Text>

        <TextInput
          style={styles.formInput}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.formInputPassword}
            placeholder="Senha"
            placeholderTextColor="#A0A0A0"
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="#A0A0A0"
            />
          </Pressable>
        </View>

        <Pressable
          style={styles.formButton}
          onPress={userLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.textButton}>Logar</Text>
          )}
        </Pressable>
        <Pressable style={styles.formButtonCad} onPress={() => navigate("SignUp")}>
          <Text style={styles.formButtonCardText}>Cadastrar</Text>
        </Pressable>

        <View style={styles.subContainer}>
          <Pressable
            style={styles.subButton}
            onPress={() => navigate("ReplacePass")}
          >
            <Text style={styles.subTextButton}>Esqueceu a senha</Text>
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
    justifyContent: "flex-start",
  },
  formImage: {
    width: 120,
    height: 120,
    marginVertical: 40,
    resizeMode: "contain",
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8B0000",
    marginBottom: 20,
    textAlign: "center",
  },
  formCard: {
    position: "absolute",
    top: "25%",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
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
  passwordContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  formInputPassword: {
    flex: 1,
    padding: 12,
    borderColor: "#8B0000",
    borderWidth: 1,
    borderRadius: 8,
    color: "#333333",
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },
  iconContainer: {
    position: "absolute",
    right: 12,
    padding: 8,
  },
  formButton: {
    width: "90%",
    paddingVertical: 14,
    backgroundColor: "#8B0000",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 12,
  },
  formButtonCad:{
    width: "90%",
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth:2,
    borderColor:"#8B0000",
    alignItems: "center",
    marginVertical: 12,
  },
  textButton: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  formButtonCardText: {
    color: "#8B0000",
    fontSize: 16,
    fontWeight: "bold",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  subButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  subTextButton: {
    color: "#8B0000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
