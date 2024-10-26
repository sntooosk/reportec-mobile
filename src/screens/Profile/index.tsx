import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Animated,
} from "react-native";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";
import { db } from "../../utils/firebase";
import { useAuth } from "../../context/AuthContext";
import Icon from "react-native-vector-icons/Feather";

export default function Profile() {
  const auth = getAuth();
  const { signOut } = useAuth();
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sala, setSala] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [reports, setReports] = useState([]);
  const [openSalaPicker, setOpenSalaPicker] = useState(false);
  const [salaOptions] = useState([
    { label: "1 DSB", value: "1 DSB" },
    { label: "2 DSB", value: "2 DSB" },
    { label: "3 DSB", value: "3 DSB" },
    { label: "1 MKT", value: "1 MKT" },
    { label: "2 MKT", value: "2 MKT" },
    { label: "3 MKT", value: "3 MKT" },
    { label: "1 ADM", value: "1 ADM" },
    { label: "2 ADM", value: "2 ADM" },
    { label: "3 ADM", value: "3 ADM" },
  ]);

  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    animateCard();
    fetchUserData();
    fetchUserReports();
  }, []);

  const animateCard = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const cardTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const fetchUserData = async () => {
    if (user) {
      try {
        const userQuery = query(
          collection(db, "users"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const profile = querySnapshot.docs[0].data();
          setName(profile?.name || "");
          setLastName(profile?.lastName || "");
          setSala(profile?.sala || "");
          setNumber(profile?.number || "");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    }
  };

  const fetchUserReports = async () => {
    if (user) {
      const reportsQuery = query(
        collection(db, "reports"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(reportsQuery);
      const reportsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(reportsList);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    await fetchUserReports();
    setRefreshing(false);
  };

  const handleSaveProfile = async () => {
    if (!name || !lastName || !sala || !number) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado");
      return;
    }
    try {
      setLoading(true);
      const userRef = doc(collection(db, "users"), user.uid);
      await setDoc(
        userRef,
        { userId: user.uid, name, lastName, sala, number },
        { merge: true }
      );
      Alert.alert("Sucesso", "Dados atualizados");
      setEditing(false);
    } catch {
      Alert.alert("Erro", "Erro ao salvar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (reportId) => {
    try {
      await deleteDoc(doc(db, "reports", reportId));
      Alert.alert("Sucesso", "Denúncia excluída com sucesso.");
      setReports((prevReports) =>
        prevReports.filter((item) => item.id !== reportId)
      );
    } catch (error) {
      console.error("Erro ao excluir denúncia:", error);
      Alert.alert("Erro", "Não foi possível excluir a denúncia.");
    }
  };

  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 11);
    const formatted = cleaned
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2");
    setNumber(formatted);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pendente":
        return { color: "#FFA500" };
      case "Em Análise":
        return { color: "#1E90FF" };
      case "Resolvido":
        return { color: "#32CD32" };
      default:
        return { color: "#333" };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.formTitle}>Perfil</Text>
        <Pressable onPress={signOut}>
          <Icon name="log-out" size={28} color="#FFF" />
        </Pressable>
      </View>

      <Animated.View
        style={[
          styles.formCard,
          { transform: [{ translateY: cardTranslateY }] },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            style={[
              styles.formInput,
              { backgroundColor: editing ? "#FAFAFA" : "#EFEFEF" },
            ]}
            placeholder="Nome"
            placeholderTextColor="#A9A9A9"
            onChangeText={setName}
            value={name}
            editable={editing}
          />
          <TextInput
            style={[
              styles.formInput,
              { backgroundColor: editing ? "#FAFAFA" : "#EFEFEF" },
            ]}
            placeholder="Sobrenome"
            placeholderTextColor="#A9A9A9"
            onChangeText={setLastName}
            value={lastName}
            editable={editing}
          />

          {editing ? (
            <DropDownPicker
              open={openSalaPicker}
              value={sala}
              items={salaOptions}
              setOpen={setOpenSalaPicker}
              setValue={setSala}
              placeholder="Selecione a sala"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          ) : (
            <TextInput
              style={[styles.formInput, { backgroundColor: "#EFEFEF" }]}
              placeholder="Sala"
              placeholderTextColor="#A9A9A9"
              value={sala}
              editable={false}
            />
          )}

          <TextInput
            style={[
              styles.formInput,
              { backgroundColor: editing ? "#FAFAFA" : "#EFEFEF" },
            ]}
            placeholder="Número de celular"
            placeholderTextColor="#A9A9A9"
            onChangeText={formatPhoneNumber}
            value={number}
            keyboardType="phone-pad"
            editable={editing}
          />

          <Pressable
            style={styles.editButton}
            onPress={() => setEditing(!editing)}
          >
            <Text style={styles.textButton}>
              {editing ? "Cancelar" : "Editar Perfil"}
            </Text>
          </Pressable>

          {editing && (
            <Pressable
              style={styles.formButton}
              onPress={handleSaveProfile}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.textButton}>Salvar</Text>
              )}
            </Pressable>
          )}

          <Text style={styles.sectionTitle}>Suas Denúncias</Text>
          {reports.map((item) => (
            <View key={item.id} style={styles.reportItem}>
              <View style={styles.reportTextRow}>
                <Text style={styles.reportLabel}>Tipo: </Text>
                <Text style={styles.reportValue}>{item.bullyingType}</Text>
              </View>
              <View style={styles.reportTextRow}>
                <Text style={styles.reportLabel}>Descrição: </Text>
                <Text style={styles.reportValue}>{item.description}</Text>
              </View>
              <View style={styles.reportTextRow}>
                <Text style={styles.reportLabel}>Resposta: </Text>
                <Text style={styles.reportValue}>
                  {item.response ? item.response : "Sem resposta"}
                </Text>
              </View>
              <View style={styles.reportTextRow}>
                <Text style={styles.reportLabel}>Status: </Text>
                <Text style={[styles.reportValue, getStatusColor(item.status)]}>
                  {item.status}
                </Text>
              </View>
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDeleteReport(item.id)}
              >
                <Icon name="trash" size={24} color="#B22222" />
              </Pressable>
            </View>
          ))}
          {reports.length === 0 && (
            <Text style={styles.emptyText}>Nenhuma denúncia encontrada.</Text>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8B0000",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 50,
  },
  reportTextRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  reportLabel: {
    fontWeight: "bold",
    color: "#333",
  },
  reportValue: {
    color: "#333",
    flexShrink: 1, 
  },
  formCard: {
    width: "100%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
  dropdown: {
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
  },
  dropdownContainer: {
    borderColor: "#DDD",
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  scrollViewContent: {},
  formInput: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderColor: "#8B0000",
    borderWidth: 1,
    borderRadius: 8,
    color: "#333",
    fontSize: 16,
  },
  formButton: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#8B0000",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  editButton: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#8B0000",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  textButton: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#B22222",
    marginTop: 30,
    marginBottom: 10,
  },
  reportItem: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    position: "relative",
    alignSelf: "stretch",
  },
  deleteButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  emptyText: {
    color: "#A9A9A9",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
});
