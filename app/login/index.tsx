import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuthContext } from "@/app/context/authContext";
import User from "../types/User";

interface UserFormData {
  user: string;
  password: string;
}

export default function Login() {
  const { signin } = useAuthContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { handleSubmit, control } = useForm<UserFormData>();

  const onSubmit = async (data: UserFormData) => {
    console.log(data);
    try {
      await signin(data.user, data.password);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Erro ao fazer login");
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-white text-3xl mb-5">LOGIN</Text>
      <View className="w-full mb-6">
        <Controller
          control={control}
          name="user"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholderTextColor="#A0A0A0"
              placeholder="Nome de usuário"
              className="bg-white rounded py-3 px-4 mb-3 text-black"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <View>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholderTextColor="#A0A0A0"
                secureTextEntry={!isPasswordVisible}
                placeholder="Senha"
                className="bg-white rounded py-3 px-4 text-black"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <TouchableOpacity
            className="absolute right-4 top-3"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <Eye color="#333333" size={18} />
            ) : (
              <EyeOff color="#333333" size={18} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className="bg-emerald-700 rounded-lg py-3 px-6 w-full items-center"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white font-bold text-xl">ACESSAR CONTA</Text>
      </TouchableOpacity>
    </View>
  );
}
