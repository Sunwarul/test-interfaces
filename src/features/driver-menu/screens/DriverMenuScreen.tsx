// @ts-nocheck
import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDriverProfile, useDeleteRecord } from "../hooks";
import { DriverMenuDrawer } from "../components/DriverMenuDrawer";
import type { RootStackParamList } from "@/navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function DriverMenuScreen() {
  const navigation = useNavigation<NavigationProp>();
  
  // For demo purposes, using a placeholder ID
  // In production, this would come from auth store or route params
  const { data, isLoading, isError, error, refetch } = useDriverProfile("demo-driver-id");
  const deleteMutation = useDeleteRecord();

  const handleClose = () => {
    navigation.goBack();
  };

  const handleMenuItemPress = (item: string) => {
    switch (item) {
      case "wallet":
        navigation.navigate("Home");
        break;
      case "orders":
        navigation.navigate("Home");
        break;
      case "delete-profile":
        handleDeleteProfile();
        break;
      default:
        break;
    }
  };

  const handleDeleteProfile = () => {
    if (!data?.id) return;
    
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete this profile? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteMutation.mutate(data.id, {
              onSuccess: (result) => {
                if (result.success) {
                  navigation.navigate("Home");
                }
              },
              onError: (err) => {
                Alert.alert("Error", "Failed to delete profile. Please try again.");
              },
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-black-10">
      {/* Background overlay */}
      <Pressable className="flex-1" onPress={handleClose}>
        <View className="flex-1 bg-black/50" />
      </Pressable>

      {/* Menu Drawer */}
      <View className="absolute inset-0 flex-row justify-end">
        {isLoading ? (
          <View className="bg-white w-[374px] h-full items-center justify-center">
            <ActivityIndicator size="large" className="text-primary" />
          </View>
        ) : isError ? (
          <View className="bg-white w-[374px] h-full items-center justify-center p-6">
            <Text className="text-text-primary text-center mb-4">
              {error?.message ?? "Failed to load profile"}
            </Text>
            <Pressable
              onPress={() => refetch()}
              className="bg-primary px-6 py-3 rounded-[32px]"
            >
              <Text className="text-primary-foreground font-semibold">Retry</Text>
            </Pressable>
          </View>
        ) : (
          <DriverMenuDrawer
            profile={data}
            onClose={handleClose}
            onMenuItemPress={handleMenuItemPress}
          />
        )}
      </View>

      {/* Delete loading overlay */}
      {deleteMutation.isPending && (
        <View className="absolute inset-0 bg-black/50 items-center justify-center">
          <View className="bg-white p-6 rounded-xl">
            <ActivityIndicator size="large" className="text-primary mb-2" />
            <Text className="text-text-primary text-center">Deleting...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
