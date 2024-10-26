import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { propsNavigationStack } from "./types";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/signUp";
import ReplacePass from "../screens/ReplacePass";

const Stack = createNativeStackNavigator<propsNavigationStack>();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ReplacePass" component={ReplacePass} />
    </Stack.Navigator>
  );
}
