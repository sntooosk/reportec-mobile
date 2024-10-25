import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase'; // Importação do Firestore configurado

export default function Home() {
    const [modalVisible, setModalVisible] = useState(false);
    const [victimName, setVictimName] = useState('');
    const [bullyingType, setBullyingType] = useState('');
    const [status, setStatus] = useState('Pendente');
    const [description, setDescription] = useState('');

    // Dropdown picker state
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Bullying Físico', value: 'fisico' },
        { label: 'Bullying Verbal', value: 'verbal' },
        { label: 'Bullying Psicológico', value: 'psicologico' },
        { label: 'Bullying Social', value: 'social' },
        { label: 'Cyberbullying', value: 'cyberbullying' }
    ]);

    const handleSubmit = async () => {
        if (!victimName || !bullyingType || !description) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        try {
            await addDoc(collection(db, "reports"), {
                victimName,
                bullyingType,
                description,
                status,
                timestamp: new Date()
            });

            Alert.alert("Sucesso", "Reporte enviado com sucesso!");
            setVictimName('');
            setBullyingType('');
            setDescription('');
            setModalVisible(false);
        } catch (error) {
            Alert.alert("Erro", "Falha ao enviar o reporte. Tente novamente mais tarde.");
            console.error("Erro ao enviar o reporte:", error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Botão para abrir a modal */}
            <TouchableOpacity style={styles.reportButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.reportButtonText}>Reportar Caso de Bullying</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Formulário de Reporte de Bullying</Text>

                        {/* Nome da Vítima */}
                        <TextInput
                            style={styles.input}
                            placeholder="Nome da Vítima"
                            placeholderTextColor="#FFCDD2"
                            value={victimName}
                            onChangeText={setVictimName}
                        />

                        {/* Modalidade de Bullying com DropDownPicker */}
                        <DropDownPicker
                            open={open}
                            value={bullyingType}
                            items={items}
                            setOpen={setOpen}
                            setValue={setBullyingType}
                            setItems={setItems}
                            placeholder="Selecione a modalidade"
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                        />

                        {/* Descrição */}
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Descrição"
                            placeholderTextColor="#FFCDD2"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                        />

                        {/* Botão de Envio */}
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitButtonText}>Enviar Reporte</Text>
                        </TouchableOpacity>

                        {/* Botão para Fechar a Modal */}
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButton}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffe5e5',
    },

    reportButton: {
        backgroundColor: '#ff4d4d',
        padding: 15,
        borderRadius: 8,
    },

    reportButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 8,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#b22222',
        marginBottom: 20,
    },

    input: {
        borderColor: '#ff4d4d',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginVertical: 10,
        fontSize: 16,
        color: '#b22222',
    },

    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },

    dropdown: {
        borderColor: '#ff4d4d',
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 10,
    },

    dropdownContainer: {
        borderColor: '#ff4d4d',
    },

    submitButton: {
        backgroundColor: '#b22222',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },

    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    closeButton: {
        color: '#b22222',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
    },
});
