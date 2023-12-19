import { Slot } from "expo-router";
import { StatusBar } from "react-native";

export default function AppLayout() {
  // providers
  return (
    <>
      <StatusBar style="light" />
      <Slot />
    </>
  );
};
