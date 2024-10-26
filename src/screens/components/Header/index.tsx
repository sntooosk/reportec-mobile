
import React from "react";
import { View, Text } from "react-native";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <View style={[styles.container, { backgroundColor: "#8B0000" }]}>
      <View style={styles.contain}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
}

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contain: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
