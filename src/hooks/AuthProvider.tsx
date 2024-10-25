import React, { useEffect, useState, ReactNode } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { User } from "firebase/auth";
import Credentials from "../models/Credentials";
import { signUpApi } from "../api/SignUp";
import { signInApi } from "../api/SignIn";
import { asyncGetAuth, asyncRemoveAuth, asyncSetAuth } from "src/utils/storage/AuthStorage";
import { asyncRemoveUser } from "src/utils/storage/UserStorage";


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authData, setAuthData] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadFromStorage();
  }, []);

  async function loadFromStorage() {
    setIsLoading(true);
    const user = await asyncGetAuth();
    if (user) {
      setAuthData(user);
    }
    setIsLoading(false);
  }

  async function signIn({ email, password }: Credentials) {
    try {
      setIsLoading(true);
      const { user } = await signInApi(email, password);
      await asyncSetAuth(user);
      setAuthData(user);
    } catch (err: any) {
      Alert.alert("Atenção", err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp({ email, password }: Credentials) {
    setIsLoading(true);
    try {
      await signUpApi(email, password);
      setIsLoading(false);
      Alert.alert("Sucesso", "Registro bem-sucedido");
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Erro", error.message);
    }
  }

  const signOut = async () => {
    Alert.alert(
      "Confirmação",
      "Deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: async () => {
            setAuthData(undefined);
            await asyncRemoveAuth();
            await asyncRemoveUser()
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        signIn,
        signUp,
        signOut,
        isLoading,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
