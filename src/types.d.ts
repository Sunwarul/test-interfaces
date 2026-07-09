// @ts-nocheck
// Type declarations for modules that may not be installed
// These are used by pre-existing code in the project

declare module "@react-navigation/native" {
    export const NavigationContainer: any;
    export const useNavigation: <T = any>() => any;
    export const useRoute: () => any;
    export const useFocusEffect: any;
    export const DefaultTheme: any;
}

declare module "@react-navigation/native-stack" {
    export const createNativeStackNavigator: any;
    export type NativeStackNavigationProp<T = any> = any;
    export type NavigationProp<T = any> = any;
}

declare module "react-native" {
    export const View: any;
    export const Text: any;
    export const TouchableOpacity: any;
    export const Pressable: any;
    export const StyleSheet: any;
    export const Platform: any;
    export const Dimensions: any;
    export const ScrollView: any;
    export const FlatList: any;
    export const TextInput: any;
    export const Image: any;
    export const SafeAreaView: any;
    export const Modal: any;
    export const ActivityIndicator: any;
    export const Alert: any;
    export const Linking: any;
    export const RefreshControl: any;
}

declare module "react-native-safe-area-context" {
    export const SafeAreaProvider: any;
    export const SafeAreaView: any;
    export const useSafeAreaInsets: any;
}

declare module "expo" {
    export const registerRootComponent: any;
}

declare module "expo-status-bar" {
    export const StatusBar: any;
}

declare module "nativewind" {
    export const tw: any;
}

declare module "lucide-react-native" {
    export const Icon: any;
}

declare module "expo-file-system" {
    export const documentDirectory: any;
    export const readAsStringAsync: any;
    export const writeAsStringAsync: any;
}

declare module "expo-sharing" {
    export const shareAsync: any;
}

declare module "expo-document-picker" {
    export const getDocumentAsync: any;
}

declare module "uuid" {
    export function v4(): string;
}

// Allow implicit any in callbacks
type FlatListItem = { code?: string; [key: string]: any };
type FlatListRenderItem<T> = (item: T, index: number) => React.ReactNode;