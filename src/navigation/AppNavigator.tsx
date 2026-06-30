import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "@/screens/HomeScreen";
import ContinueSignUpScreen from "@/features/continue-signup/screens/ContinueSignUpScreen";
import ExportScreen from "@/features/export/screens/ExportScreen";
import ImportScreen from "@/features/import/screens/ImportScreen";
import DriverMenuScreen from "@/features/driver-menu/screens/DriverMenuScreen";
import DriverOrdersScreen from "@/features/driver-orders/screens/DriverOrdersScreen";

import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator id="RootStack" initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ContinueSignUp" component={ContinueSignUpScreen} />
      <Stack.Screen name="Export" component={ExportScreen} />
      <Stack.Screen name="Import" component={ImportScreen} />
      <Stack.Screen 
        name="DriverMenu" 
        component={DriverMenuScreen}
        options={{ presentation: "transparentModal", animation: "fade" }}
      />
      <Stack.Screen name="DriverOrders" component={DriverOrdersScreen} />
    </Stack.Navigator>
  );
}