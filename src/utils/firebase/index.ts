
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
import * as firebaseAuth from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const firebaseConfig = {

  apiKey: "AIzaSyBrRuiOk8rjxO6jH91v--LPuwwyIrZPiH8",
  authDomain: "bdreporttec.firebaseapp.com",
  databaseURL: "https://bdreporttec-default-rtdb.firebaseio.com",
  projectId: "bdreporttec",
  storageBucket: "bdreporttec.appspot.com",
  messagingSenderId: "153475202057",
  appId: "1:153475202057:web:2fa40b7f784e765b940cd8",
  measurementId: "G-LX51TDQBJM"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: reactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { db, auth };
