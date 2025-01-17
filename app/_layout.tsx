import { Stack } from "expo-router";
import "./globals.css";
import { AuthContextProvider } from "./context/authContext";
import { CarsContextProvider } from "./context/carsContext";

export default function RootLayout() {
  return (
      <CarsContextProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" />
          <Stack.Screen name="model/[carBrandCode]" />
          <Stack.Screen name="login" />
        </Stack>
      </CarsContextProvider>
  );
}
