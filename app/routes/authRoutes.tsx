import { ActivityIndicator, View } from "react-native";
import { useAuthContext } from "../context/authContext";
import Home from "../home";
import Login from "../login";

export default function AuthRoutes() {
  const { authUser, loading } = useAuthContext();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-900">
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  return authUser ? <Home /> : <Login />
}
