import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from 'src/models/UserProfile';

export const asyncSetUserProfile = async (profile: UserProfile) => {
  try {
    const profileJson = JSON.stringify(profile);
    await AsyncStorage.setItem('userProfile', profileJson);
  } catch (error) {
    console.error('Failed to save user profile to storage', error);
  }
};

export const asyncGetUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const profileJson = await AsyncStorage.getItem('userProfile');
    return profileJson ? JSON.parse(profileJson) : null;
  } catch (error) {
    console.error('Failed to load user profile from storage', error);
    return null;
  }
};

export const asyncRemoveUser = async () => {
  await AsyncStorage.removeItem("userProfile");
};
