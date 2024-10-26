
import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncSetAuth = async (chave: any) =>
  await AsyncStorage.setItem("reportec@auth", JSON.stringify(chave));

export const asyncGetAuth = async () => {
  const data = await AsyncStorage.getItem("reportec@auth");
  const response: any = data ? JSON.parse(data) : null;

  return response;
};


export const asyncRemoveAuth = async () => {
  await AsyncStorage.removeItem("bussPass@auth");
};
