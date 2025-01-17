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

interface UserFormData {
  user: string;
  password: string;
}

export default function Login() {
  const { signin } = useAuthContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<UserFormData>({
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      signin(data.user, data.password);
      reset();
    } catch (error) {
      Alert.alert("Erro", "Erro ao fazer login");
    }
  };

  return (
    <View className="flex flex-1 px-5 flex-col justify-center items-center pb-28 bg-gray-900">
      <Text className="font-bold text-white text-3xl mb-5">LOGIN</Text>
      <View className="w-full mb-6">
        <Controller
          control={control}
          name="user"
          rules={{
            required: "O nome de usuário é obrigatório",
          }}
          render={({ field: { onChange, value } }) => (
            <View className="mb-3">
              <TextInput
                placeholderTextColor="#A0A0A0"
                placeholder="Nome de usuário"
                className="bg-white rounded py-3 px-4 text-black"
                value={value}
                onChangeText={onChange}
              />
              {errors.user && (
                <Text className="text-red-500 text-sm pt-1">
                  {errors.user.message}
                </Text>
              )}
            </View>
          )}
        />
        <View>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "A senha é obrigatória",
            }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry={!isPasswordVisible}
                  placeholder="Senha"
                  className="bg-white rounded py-3 px-4 text-black"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.password && (
                  <Text className="text-red-500 text-sm pt-1">
                    {errors.password.message}
                  </Text>
                )}
              </View>
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
