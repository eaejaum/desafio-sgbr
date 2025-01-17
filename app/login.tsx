import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Eye, EyeOff, LockKeyhole, User } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuthContext } from "@/app/context/authContext";

interface UserFormData {
  user: string;
  password: string;
}

export default function Login() {
  const { signin } = useAuthContext();
  const logoImage = require("../assets/images/logo-sgbr1.png");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
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
    <View className="flex-1 px-7 flex-col justify-center items-center pb-60 bg-slate-900 relative">
      <View className="flex items-center justify-center mb-8">
        <Image source={logoImage} className="w-48 h-24 mb-6" />
        <Text className="text-white font-semibold text-4xl text-center leading-10">
          Bem-vindo! Faça login para continuar
        </Text>
      </View>
      <View className="w-full mb-6">
        <Controller
          control={control}
          name="user"
          rules={{
            required: "O nome de usuário é obrigatório",
          }}
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                placeholderTextColor="#ACB5BB"
                placeholder="Nome de usuário"
                className={
                  errors.user
                    ? "bg-white rounded-xl py-4 px-4 pl-12 text-black"
                    : "bg-white rounded-tl-xl rounded-tr-xl py-4 px-4 pl-12 text-black"
                }
                value={value}
                onChangeText={onChange}
              />
              {errors.user && (
                <Text className="text-red-600 text-sm pt-1 pb-2">
                  {errors.user.message}
                </Text>
              )}
              <View className="absolute left-4 top-4">
                <User color="#0284c7" size={18} />
              </View>
            </View>
          )}
        />
        {!errors.user && <View className="border-t-2 border-gray-100"></View>}
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
                  placeholderTextColor="#ACB5BB"
                  secureTextEntry={!isPasswordVisible}
                  placeholder="Senha"
                  className={
                    errors.user
                      ? "bg-white rounded-xl py-4 px-4 pl-12 pr-12 text-black"
                      : "bg-white rounded-bl-xl rounded-br-xl py-4 px-4 pr-12 pl-12 text-black"
                  }
                  value={value}
                  onChangeText={onChange}
                />
                {errors.password && (
                  <Text className="text-red-600 text-sm pt-1">
                    {errors.password.message}
                  </Text>
                )}
              </View>
            )}
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <Eye color="#ACB5BB" size={18} />
            ) : (
              <EyeOff color="#ACB5BB" size={18} />
            )}
          </TouchableOpacity>
          <View className="absolute left-4 top-4">
            <LockKeyhole color="#0284c7" size={18} />
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="bg-sky-600 rounded-2xl py-4 px-6 w-full items-center mt-5"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white font-normal text-xl">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
