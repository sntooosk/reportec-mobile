import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { getAuth } from "firebase/auth";
import Header from "../components/Header";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [bullyingType, setBullyingType] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastName: "",
    sala: "",
  });

  const [items] = useState([
    { label: "Bullying Físico", value: "fisico" },
    { label: "Bullying Verbal", value: "verbal" },
    { label: "Bullying Psicológico", value: "psicologico" },
    { label: "Bullying Social", value: "social" },
    { label: "Cyberbullying", value: "cyberbullying" },
  ]);

  // Obter ID do usuário logado
  const user = getAuth().currentUser;

  // Obter dados do usuário logado
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userQuery = query(
          collection(db, "users"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserInfo({
            name: userData.name || "",
            lastName: userData.lastName || "",
            sala: userData.sala || "",
          });
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleSubmit = async () => {
    if (!userInfo.name || !bullyingType || !description) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    setLoading(true); // Ativar carregamento
    try {
      await addDoc(collection(db, "reports"), {
        userId: user?.uid,
        victimName: userInfo.name,
        victimLastName: userInfo.lastName,
        sala: userInfo.sala,
        bullyingType,
        description,
        status: "Pendente",
        timestamp: new Date(),
      });
      Alert.alert("Sucesso", "Reporte enviado!");
      setBullyingType("");
      setDescription("");
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Erro", "Falha ao enviar o reporte.");
    } finally {
      setLoading(false); // Desativar carregamento
    }
  };

  return (
    <>
      <Header title="Reporte" />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.reportButtonText}>Reportar Caso de Bullying</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Formulário de Reporte de Bullying
              </Text>

              <DropDownPicker
                open={open}
                value={bullyingType}
                items={items}
                setOpen={setOpen}
                setValue={setBullyingType}
                placeholder="Selecione a modalidade"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descrição"
                placeholderTextColor="#A9A9A9"
                value={description}
                onChangeText={setDescription}
                multiline
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={loading} // Desativa o botão ao carregar
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Enviar Reporte</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  reportButton: {
    backgroundColor: "#8B0000",
    padding: 15,
    borderRadius: 8,
  },
  reportButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8B0000",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#FFF",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  dropdown: {
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#FFF",
  },
  dropdownContainer: {
    borderColor: "#DDD",
  },
  submitButton: {
    backgroundColor: "#8B0000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    color: "#8B0000",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});
