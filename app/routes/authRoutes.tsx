import { ActivityIndicator, View } from "react-native";
import { useAuthContext } from "../context/authContext";
import Login from "../login";
import Home from "../home";

export default function AuthRoutes() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return user ? <Home /> : <Login />
}
