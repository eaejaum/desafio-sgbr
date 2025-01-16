import { View } from "react-native";
import { AuthContextProvider } from "@/app/context/authContext";
import AuthRoutes from "./routes/authRoutes";
import { CarsContextProvider } from "./context/carsContext";

export default function Index() {
  return (
    <AuthContextProvider>
      <CarsContextProvider>
        <View className="flex flex-1 px-5 flex-col justify-center bg-gray-900">
          <AuthRoutes />
        </View>
      </CarsContextProvider>
    </AuthContextProvider>
  );
}
