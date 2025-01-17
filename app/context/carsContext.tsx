import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CarBrand from "../types/CarBrand";
import CarModel from "../types/CarModel";

type CarsContextData = {
  carBrands: CarBrand[] | null;
  carModels: CarModel[] | null;
  loading: boolean;
  fetchBrandsData: () => void;
  fetchModelsData: (brandId: number) => void;
};

export const CarsContext = createContext<CarsContextData | undefined>(
  undefined
);

export const CarsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [carBrands, setCarBrands] = useState<CarBrand[] | null>([]);
  const [carModels, setCarModels] = useState<CarModel[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBrandsData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://parallelum.com.br/fipe/api/v1/carros/marcas"
      );
      const responseData: CarBrand[] = await response.json();
      setCarBrands(responseData);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar marcas de carro: ", error);
    }
  };

  const fetchModelsData = async (brandId: number): Promise<void> => {
    try {
      setCarModels(null);
      setLoading(true);
      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos`
      );
      const responseData = await response.json();
      setCarModels(responseData.modelos);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar modelos de carro: ", error);
    }
  };

  return (
    <CarsContext.Provider
      value={{
        carBrands,
        carModels,
        loading,
        fetchBrandsData,
        fetchModelsData,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};

export const useCarsContext = () => {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error("CarsContext must be used within a CarsContextProvider!");
  }
  return context;
};
