import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 35,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 0 : 25,
  },

  contentHeader: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 30,
    marginRight: 20,
  },

  appName: {
    fontSize: 20,
    lineHeight: 29.8,
    color: 'white',
    fontWeight: 'bold', 
  },

  status: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500', 
  },

  iconButton: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
});
