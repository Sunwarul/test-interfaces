// @ts-nocheck
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  ContinueSignUp: undefined;
  Export: undefined;
  Import: undefined;
  DriverMenu: undefined;
  DriverOrders: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
