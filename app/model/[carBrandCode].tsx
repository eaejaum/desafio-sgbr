import { ArrowLeft, Car, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CarModel from "../types/CarModel";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCarsContext } from "../context/carsContext";

export default function Model() {
  const router = useRouter();
  const { carBrandCode } = useLocalSearchParams();
  const { carModels, fetchModelsData, loading } = useCarsContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchModels = (text: string) => {
    setSearchTerm(text);
  };

  useEffect(() => {
    if (carBrandCode) {
      const fetchData = async () => {
        fetchModelsData(Number(carBrandCode));
      };
      fetchData();
    }
  }, [carBrandCode]);

  const filteredModels = carModels?.filter((model) =>
    model.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderModelItem = ({ item }:{ item: CarModel}) => (
    <View key={item.codigo} className="mb-4">
      <TouchableOpacity className="bg-white rounded-xl p-4 shadow-lg flex-row items-center justify-between">
        <Car size={24} color="#333" />
        <Text className="ml-3 text-lg font-semibold text-gray-800">
          {item.nome}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 pt-20 px-5 flex-col bg-gray-900">
      <Pressable
        onPress={() => router.back()}
        className="flex-row items-center mb-6"
      >
        <ArrowLeft size={24} color="#FFF" />
        <Text className="text-white text-lg ml-2">Voltar</Text>
      </Pressable>
      <View className="w-full flex-row items-center mb-6 relative">
        <TextInput
          placeholderTextColor="#A0A0A0"
          onChangeText={handleSearchModels}
          placeholder="Digite o nome do modelo..."
          className="flex-1 bg-gray-700 rounded py-3 px-4 text-white"
        />
        <View className="absolute right-4">
          <Search color="#A0A0A0" />
        </View>
      </View>


      <View className="mb-3">
        <Text className="text-emerald-500 font-bold text-3xl">MODELOS</Text>
        <View className="border-t-2 border-emerald-500 mt-2"></View>
      </View>

      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}

      <FlatList
        data={filteredModels}
        renderItem={renderModelItem}
        keyExtractor={(item) => item.codigo.toString()}
        className="pb-6"
        ListEmptyComponent={
          !loading && !filteredModels?.length ? (
            <Text className="text-white text-center text-xl">
              Nenhum modelo encontrado
            </Text>
          ) : null
        }
      />
    </View>
  );
}
