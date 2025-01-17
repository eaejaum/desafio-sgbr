import { StatusBar, View } from "react-native";
import { AuthContextProvider } from "@/app/context/authContext";
import AuthRoutes from "./routes/authRoutes";
import { CarsContextProvider } from "./context/carsContext";

export default function Index() {
  return (
    <AuthContextProvider>
      <CarsContextProvider>
        <StatusBar />
        <AuthRoutes />
      </CarsContextProvider>
    </AuthContextProvider>
  );
}
