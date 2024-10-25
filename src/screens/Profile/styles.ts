import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2937",
    padding: 16,
  },

  header: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },

  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
  },

  formInput: {
    width: "90%",
    padding: 12,
    marginVertical: 8,
    borderColor: "#4E3D8D",
    borderWidth: 1,
    borderRadius: 8,
    color: "#FFF",
    fontSize: 16,
    backgroundColor: "#2D3748",
  },

  formButton: {
    width: "90%",
    paddingVertical: 12,
    backgroundColor: "#4E3D8D",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 12,
  },

  textButton: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  logoutButton: {
    width: "90%",
    paddingVertical: 12,
    backgroundColor: "#FF6347",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
});
