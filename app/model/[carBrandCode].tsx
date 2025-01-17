import { ArrowLeft, Car, MoveRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
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

  const renderModelItem = ({ item }: { item: CarModel }) => (
    <View key={item.codigo} className="mb-6">
      <TouchableOpacity className="bg-white rounded-xl p-10 shadow-lg flex-col items-center justify-between g-2">
        <Car size={50} color="#333" />
        <Text className="text-lg font-semibold text-black">{item.nome}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex flex-1 flex-col bg-slate-900">
      <View
        style={{ height: 180 }}
        className="flex bg-white rounded-bl-xl rounded-br-xl mb-6 px-6 pb-6 p-10"
      >
        <Pressable
          onPress={() => router.back()}
          className="flex flex-row items-center mt-6 mb-4"
        >
          <ArrowLeft size={24} color="#ACB5BB" />
          <Text className="text-black text-normal ml-2">Voltar</Text>
        </Pressable>
        <View className="w-full flex-row mb-6 p-2">
          <TextInput
            placeholderTextColor="#ACB5BB"
            onChangeText={handleSearchModels}
            placeholder="Digite o nome do modelo..."
            className="flex-1 pr-10 text-black"
          />
          <View className="rounded-full bg-sky-600 p-3">
            <MoveRight color="white" />
          </View>
        </View>
      </View>

      <View className="flex-1 px-6">
        {loading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#0284c7" />
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
    </View>
  );
}
