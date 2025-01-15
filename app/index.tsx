import { View } from "react-native";
import Login from "./login/index";
import { AuthContextProvider } from "@/app/context/authContext";
import AuthRoutes from "./routes/authRoutes";

export default function Index() {
  return (
    <AuthContextProvider>
      <View className="flex flex-1 px-5 flex-col justify-center bg-gray-900">
        <AuthRoutes />
      </View>
    </AuthContextProvider>
  );
}
