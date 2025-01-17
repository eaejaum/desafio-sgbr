import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthContext } from "./context/authContext";
import { Car, Caravan, CarFront, LogOut, MoveRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useCarsContext } from "./context/carsContext";
import CarBrand from "./types/CarBrand";
import { Link } from "expo-router";

export default function Home() {
  const { signout, authUser } = useAuthContext();
  const { carBrands, fetchBrandsData, loading } = useCarsContext();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!carBrands || carBrands.length === 0) {
      const fetchData = () => {
        fetchBrandsData();
      };
      fetchData();
    }
  }, [carBrands]);

  const logOut = () => {
    signout();
  };

  const confirmLogout = () => {
    Alert.alert("Confirmar Logout", "Você tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sim", onPress: logOut },
    ]);
  };

  const handleSearchBrands = (text: string) => {
    setSearchTerm(text);
  };

  const filteredBrands = carBrands?.filter((brand) =>
    brand.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderBrandItem = ({ item }: { item: CarBrand }) => (
    <View key={item.codigo} className="mb-6">
      <Link href={`/model/${item.codigo}`} asChild>
        <TouchableOpacity className="bg-white rounded-xl p-10 pb-3 shadow-lg flex-row items-center justify-between">
          <CarFront size={50} color="#333" />
          <View className="flex flex-row items-center">
            <View className="py-1 px-4 bg-sky-600 rounded-full">
              <Text className="text-white text-lg">#{item.codigo}</Text>
            </View>
            <Text className="ml-3 text-lg font-semibold text-gray-800">
              {item.nome}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );

  return (
    <View className="flex flex-1 flex-col bg-slate-900">
      <View
        style={{ height: 240 }}
        className="flex bg-white rounded-bl-xl rounded-br-xl mb-6 px-6 pb-6 p-10"
      >
        <TouchableOpacity className="mt-6 mb-4" onPress={confirmLogout}>
          <LogOut color="red" size={30} />
        </TouchableOpacity>
        {authUser && (
          <View className="mb-6">
            <Text className="text-black font-bold text-xl">
              Olá, {authUser.user.name}
            </Text>
            <Text className="text-black font-normal text-base">
              Pronto para discobrir carros novos?
            </Text>
          </View>
        )}
        <View className="w-full flex-row mb-6 p-2">
          <TextInput
            placeholderTextColor="#ACB5BB"
            onChangeText={handleSearchBrands}
            placeholder="Digite o nome da marca..."
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
          data={filteredBrands}
          renderItem={renderBrandItem}
          keyExtractor={(item) => item.codigo.toString()}
          ListEmptyComponent={
            !loading && !filteredBrands?.length ? (
              <Text className="text-white text-center text-xl">
                Nenhuma marca encontrada
              </Text>
            ) : null
          }
        />
      </View>
    </View>
  );
}
