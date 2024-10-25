import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { getAuth, User } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useAuth } from "../../context/AuthContext";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "src/routes/types";
import { asyncGetUserProfile } from "src/utils/storage/UserStorage";

export default function Profile() {
  const auth = getAuth();
  const { signOut } = useAuth();
  const user: User | null = auth.currentUser;
  const { navigate } = useNavigation<propsStack>();

  const [photo, setPhoto] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);



  const formatNumberInput = (inputValue: string): string => {
    const cleaned = inputValue.replace(/\D/g, "").slice(0, 11);
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    return match
      ? `(${match[1] || ""}) ${match[2] || ""}-${match[3] || ""}`
      : inputValue;
  };


  const userLogout = () => {
    signOut();
  };

  const fetchUserData = async () => {
    const userProfile = await asyncGetUserProfile();
    setUsername(userProfile?.username || "");
    setName(userProfile?.name || "");
    setLastName(userProfile?.lastName || "");
    setDob(userProfile?.dob || "");
    setCpf(userProfile?.cpf || "");
    setNumber(userProfile?.number || "");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      if (!user) {
        Alert.alert("Erro", "Usuário não autenticado");
        setLoading(false);
        return;
      }

      if (!username || !name || !lastName || !dob || !number || !cpf) {
        Alert.alert("Erro", "Preencha todos os campos");
        setLoading(false);
        return;
      }

      const userRef = doc(collection(db, "users"), user.uid);
      await setDoc(
        userRef,
        { username, name, lastName, dob, number, cpf },
        { merge: true }
      );

      Alert.alert("Sucesso", "Dados atualizados com sucesso");
    } catch (error) {
      Alert.alert(
        "Erro",
        "Houve um erro ao salvar os dados. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
        </View>
        <Text style={styles.formTitle}>Cadastrar Dados</Text>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <TextInput
            style={styles.formInput}
            placeholder="Nome de usuário"
            placeholderTextColor="#FFF"
            onChangeText={setUsername}
            value={username}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Digite seu nome"
            placeholderTextColor="#FFF"
            onChangeText={setName}
            value={name}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Digite seu sobrenome"
            placeholderTextColor="#FFF"
            onChangeText={setLastName}
            value={lastName}
          />
      
          <TextInput
            style={styles.formInput}
            placeholder="Digite seu número de celular"
            placeholderTextColor="#FFF"
            onChangeText={(text) => setNumber(formatNumberInput(text))}
            value={number}
            keyboardType="phone-pad"
          />
          <Pressable style={styles.formButton} onPress={handleSaveProfile} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.textButton}>Cadastrar Dados</Text>
            )}
          </Pressable>
          <Pressable style={styles.logoutButton} onPress={userLogout}>
            <Text style={styles.textButton}>Logout</Text>
          </Pressable>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
