import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Header from "../components/Header";

const faqData = [
  {
    question: "O que é bullying?",
    answer:
      "Bullying é um comportamento agressivo, intencional e repetido, que causa dor ou constrangimento em outra pessoa, física ou emocionalmente.",
  },
  {
    question: "Quais são os tipos mais comuns de bullying?",
    answer:
      "Os tipos mais comuns de bullying incluem bullying físico, verbal, psicológico, social e cyberbullying.",
  },
  {
    question: "Como identificar se uma pessoa está sofrendo bullying?",
    answer:
      "Alguns sinais incluem mudanças de comportamento, baixo desempenho acadêmico, isolamento e sintomas físicos como dores ou insônia.",
  },
  {
    question: "Como posso ajudar alguém que está sofrendo bullying?",
    answer:
      "Você pode ajudar ouvindo a pessoa, oferecendo apoio, incentivando-a a buscar ajuda de um adulto de confiança e, se possível, reportando o caso para autoridades competentes.",
  },
  {
    question: "O que fazer se eu estiver sofrendo bullying?",
    answer:
      "É importante falar com alguém de confiança, como um amigo, familiar ou professor. Não se sinta culpado e lembre-se de que ninguém merece ser tratado dessa maneira.",
  },
  {
    question: "Qual a diferença entre bullying e uma brincadeira?",
    answer:
      "Brincadeiras são feitas de forma amigável e não têm intenção de ferir. O bullying, por outro lado, é intencional e causa sofrimento emocional ou físico à vítima.",
  },
  {
    question: "O que é cyberbullying?",
    answer:
      "Cyberbullying é o uso de tecnologias digitais para intimidar, ameaçar ou humilhar alguém, geralmente em plataformas de redes sociais, e-mails ou mensagens de texto.",
  },
  {
    question: "Quais são as consequências do bullying?",
    answer:
      "O bullying pode levar a problemas emocionais, psicológicos e físicos, como depressão, ansiedade, baixa autoestima e até pensamentos suicidas.",
  },
  {
    question: "Como o bullying pode ser prevenido nas escolas?",
    answer:
      "Prevenção pode ser feita por meio de programas educacionais, promovendo o respeito e a empatia, e criando um ambiente seguro para todos os alunos.",
  },
];

export default function FAQScreen() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <Header title="FAQ" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {faqData.map((item, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity
                style={styles.questionContainer}
                onPress={() => toggleExpand(index)}
              >
                <Text style={styles.questionText}>{item.question}</Text>
                <Icon
                  name={
                    expandedIndex === index ? "minus-circle" : "plus-circle"
                  }
                  size={20}
                  color="#B22222"
                />
              </TouchableOpacity>
              {expandedIndex === index && (
                <Text style={styles.answerText}>{item.answer}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  content: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: -10,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B22222",
    flexShrink: 1,
  },
  answerText: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});
