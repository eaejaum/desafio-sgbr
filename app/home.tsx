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
import { Car, LogOut, Search } from "lucide-react-native";
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
    <View key={item.codigo} className="mb-4">
      <Link href={`/model/${item.codigo}`} asChild>
        <TouchableOpacity className="bg-white rounded-xl p-4 shadow-lg flex-row items-center justify-between">
          <Car size={24} color="#333" />
          <Text className="ml-3 text-lg font-semibold text-gray-800">
            {item.nome}
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );

  return (
    <View className="flex flex-1 px-5 flex-col justify-center pt-20 bg-gray-900">
      {authUser && (
        <Text className="text-white font-bold text-2xl mb-6">
          Olá,{" "}
          <Text className="text-emerald-500 font-bold text-3xl">
            {authUser.user.name}
          </Text>
        </Text>
      )}
      <View className="w-full flex-row items-center mb-6 relative">
        <TextInput
          placeholderTextColor="#A0A0A0"
          onChangeText={handleSearchBrands}
          placeholder="Digite o nome da marca..."
          className="flex-1 bg-gray-700 rounded py-3 px-4 text-white"
        />
        <View className="absolute right-4">
          <Search color="#A0A0A0" />
        </View>
      </View>

      <View className="mb-3">
        <Text className="text-emerald-500 font-bold text-3xl">MARCAS</Text>
        <View className="border-t-2 border-emerald-500 mt-2"></View>
      </View>

      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}

      <FlatList
        data={filteredBrands}
        renderItem={renderBrandItem}
        keyExtractor={(item) => item.codigo.toString()}
        className="pb-6"
        ListEmptyComponent={
          !loading && !filteredBrands?.length ? (
            <Text className="text-white text-center text-xl">
              Nenhuma marca encontrada
            </Text>
          ) : null
        }
      />

      <TouchableOpacity
        className="bg-red-500 rounded-lg p-3 flex-row items-center justify-center mt-6 mb-10"
        onPress={confirmLogout}
      >
        <LogOut color="#fff" size={24} />
        <Text className="text-white ml-2 text-lg font-semibold">Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
