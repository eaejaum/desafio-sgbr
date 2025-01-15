import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

export default function Login() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-white text-3xl mb-5">LOGIN</Text>
      <View className="w-full mb-6">
        <TextInput
          placeholderTextColor="#A0A0A0"
          placeholder="Nome de usuário"
          className="bg-white rounded py-3 px-4 mb-3 text-black"
        />
        <View>
          <TextInput
            placeholderTextColor="#A0A0A0"
            secureTextEntry
            placeholder="Senha"
            className="bg-white rounded py-3 px-4 text-black"
          />
          <TouchableOpacity className="absolute right-4 top-3">
            <EyeOff color="#333333" size={18} />
            {/* <Eye /> */}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className="bg-emerald-700 rounded-lg py-3 px-6 w-full items-center"
        onPress={() => console.log("Botão pressionado")}
      >
        <Text className="text-white font-bold text-xl">ACESSAR CONTA</Text>
      </TouchableOpacity>
    </View>
  );
}
